import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { mimeType, cacheControl } from './util/backend/lookup';
import { renderPage } from './pages/_document';

import { pages, versionUnknown } from './util/constants';
import { getResultProps } from './page-props/results';
import { getBadgeUrl } from './util/badge';

const { TMPDIR = '/tmp', GA_ID = '', PORT = 3107, NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
console.log('isProduction: ', isProd);
console.log('TMPDIR: ', TMPDIR);
console.log('HOME: ', process.env.HOME);

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    let { httpVersion, method, url } = req;
    console.log(`${httpVersion} ${method} ${url}`);
    let { pathname = '/', query = {} } = parse(url || '', true);
    if (pathname === '/') {
        pathname = pages.index;
    }
    try {
        if (pathname === pages.badge) {
            const { pkgSize, cacheResult } = await getResultProps(query, TMPDIR);
            const badgeUrl = getBadgeUrl(pkgSize);
            res.statusCode = 302;
            res.setHeader('Location', badgeUrl);
            res.setHeader('Cache-Control', cacheControl(isProd, cacheResult ? 7 : 0));
            res.end();
        } else if (pathname === pages.api_json) {
            const { pkgSize, cacheResult } = await getResultProps(query, TMPDIR);
            const { publishSize, installSize, version } = pkgSize;
            const result: ApiResponse = { publishSize, installSize };
            res.statusCode = version === versionUnknown ? 404 : 200;
            res.setHeader('Content-Type', mimeType(pathname));
            res.setHeader('Cache-Control', cacheControl(isProd, cacheResult ? 7 : 0));
            res.end(JSON.stringify(result));
        } else {
            const file = join('./static', pathname);
            if (existsSync(file)) {
                res.setHeader('Content-Type', mimeType(pathname));
                res.setHeader('Cache-Control', cacheControl(isProd, 30));
                createReadStream(file).pipe(res);
            } else {
                res.setHeader('Content-Type', mimeType('*.html'));
                res.setHeader('Cache-Control', cacheControl(isProd, 0));
                renderPage(res, pathname, query, TMPDIR, GA_ID);
            }
        }
    } catch (e) {
        console.error(e);
        res.setHeader('Content-Type', mimeType('500.txt'));
        res.setHeader('Cache-Control', cacheControl(isProd, 0));
        res.statusCode = 500;
        res.end('500 Internal Error');
    }
}

if (!isProd) {
    const listen = () => console.log(`Listening on ${PORT}...`);
    createServer(handler).listen(PORT, listen);
}
