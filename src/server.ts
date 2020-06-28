import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { mimeType, cacheControl } from './util/backend/lookup';
import { renderPage } from './pages/_document';
import { pages, versionUnknown, hostname } from './util/constants';
import { getResultProps } from './page-props/results';
import { getBadgeUrl, getApiResponseSize } from './util/badge';
import { parsePackageString } from './util/npm-parser';
import semver from 'semver';

const { TMPDIR = '/tmp', GA_ID = '', NODE_ENV } = process.env;
process.env.HOME = TMPDIR;
const isProd = NODE_ENV === 'production';
console.log('NODE_ENV: ' + NODE_ENV);
console.log('isProd: ', isProd);
console.log('TMPDIR: ', TMPDIR);
console.log('HOME: ', process.env.HOME);

export async function handler(req: IncomingMessage, res: ServerResponse) {
    let { method, url, headers } = req;
    console.log(`${method} ${headers.host}${url}`);
    let { pathname = '/', query = {} } = parse(url || '', true);
    if (!pathname || pathname === '/') {
        pathname = pages.index;
    }
    try {
        if (pathname === pages.badge) {
            const { pkgSize, isLatest, cacheResult } = await getResultProps(query, TMPDIR);
            const badgeUrl = getBadgeUrl(pkgSize, isLatest);
            res.statusCode = 307;
            res.setHeader('Location', badgeUrl);
            res.setHeader('Cache-Control', cacheControl(isProd, cacheResult ? 7 : 0));
            res.end();
        } else if (pathname === pages.apiv1 || pathname === pages.apiv2) {
            const { pkgSize, cacheResult } = await getResultProps(query, TMPDIR);
            const { publishSize, installSize, name, version, publishFiles, installFiles } = pkgSize;
            let result: ApiResponseV1 | ApiResponseV2;
            if (pathname === pages.apiv1) {
                result = { publishSize, installSize };
            } else {
                const publish = getApiResponseSize(publishSize, publishFiles);
                const install = getApiResponseSize(installSize, installFiles);
                result = { name, version, publish, install };
            }
            res.statusCode = version === versionUnknown ? 404 : 200;
            res.setHeader('Content-Type', mimeType(pathname));
            res.setHeader('Cache-Control', cacheControl(isProd, cacheResult ? 7 : 0));
            res.end(JSON.stringify(result));
        } else if (pathname === pages.compare) {
            let data: Buffer[] = [];
            req.on('data', chunk => data.push(chunk));
            req.on('end', () => {
                try {
                    const [packageString] = data.toString().match(/{[\s\S]+}/) || [];
                    const packageData: PackageJson = JSON.parse(packageString);
                    const queryString = Object.entries(packageData.dependencies)
                        .map(([name, version]) => {
                            const exactVersion = semver.coerce(version);
                            return exactVersion ? `${name}@${exactVersion}` : name;
                        })
                        .join(',');
                    res.writeHead(307, { Location: `/result?p=${queryString}` });
                    return res.end();
                } catch (e) {
                    return renderPage(res, pages.parseFailure, query, TMPDIR, GA_ID);
                }
            });
        } else if ((headers.host || '').startsWith('packagephobia.now.sh')) {
            res.setHeader('Cache-Control', cacheControl(isProd, 0));
            res.writeHead(301, { Location: `https://${hostname}${url}` });
            return res.end();
        } else {
            const isIndex = pathname === pages.index;
            const hasVersion =
                typeof query.p === 'string' && parsePackageString(query.p).version !== null;
            res.setHeader('Content-Type', mimeType('*.html'));
            res.setHeader('Cache-Control', cacheControl(isProd, isIndex || hasVersion ? 7 : 0));
            renderPage(res, pathname, query, TMPDIR, GA_ID);
        }
    } catch (e) {
        console.error(e);
        res.setHeader('Content-Type', mimeType('500.txt'));
        res.setHeader('Cache-Control', cacheControl(isProd, 0));
        res.statusCode = 500;
        res.end('500 Internal Error');
    }
}
