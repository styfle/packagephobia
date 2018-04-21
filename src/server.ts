import { createServer } from 'http';
import { parse } from 'url';
import { createReadStream } from 'fs';
import { mimeType, cacheControl } from './util/backend/lookup';
import { renderPage } from './pages/_document';

import { browserUrl, browserMapUrl, pages, versionUnknown } from './util/constants';
import { getResultProps } from './page-props/results';
import { getBadgeUrl } from './util/badge';

const { TMPDIR = '/tmp', GA_ID = '', PORT = 3107, NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
console.log('isProduction: ', isProd);

createServer(async (req, res) => {
    let { httpVersion, method, url } = req;
    console.log(`${httpVersion} ${method} ${url}`);
    let { pathname = '/', query = {} } = parse(url || '', true);
    if (pathname === '/') {
        pathname = pages.index;
    }
    try {
        if (pathname === browserUrl || pathname === browserMapUrl) {
            res.setHeader('Content-Type', mimeType(pathname));
            res.setHeader('Cache-Control', cacheControl(isProd, 7));
            createReadStream(`./dist${pathname}`).pipe(res);
        } else if (pathname === pages.robots) {
            res.setHeader('Content-Type', mimeType(pathname));
            res.setHeader('Cache-Control', cacheControl(isProd, 30));
            res.end('User-agent: *');
        } else if (pathname === pages.badge) {
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
            res.setHeader('Content-Type', mimeType('*.html'));
            res.setHeader('Cache-Control', cacheControl(isProd, 0));
            renderPage(res, pathname, query, TMPDIR, GA_ID);
        }
    } catch (e) {
        console.error(e);
        res.setHeader('Content-Type', mimeType('500.txt'));
        res.setHeader('Cache-Control', cacheControl(isProd, 0));
        res.statusCode = 500;
        res.end('500 Internal Error');
    }
}).listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});
