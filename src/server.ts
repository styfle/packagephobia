import { createServer } from 'http';
import { parse } from 'url';
import { createReadStream } from 'fs';
import { mimeType, cacheControl } from './util/backend/lookup';
import { renderPage } from './pages/_document';

import { browserUrl, browserMapUrl, pages } from './util/constants';

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
