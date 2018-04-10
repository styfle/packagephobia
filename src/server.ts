import { createServer } from 'http';
import { parse } from 'url';
import { createReadStream } from 'fs';
import { lookup } from './mime-types';
import { control } from './cache-control';
import { renderPage } from './pages/_document';

import { browserUrl, browserMapUrl, pages } from './constants';

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
            res.setHeader('Content-Type', lookup(pathname));
            res.setHeader('Cache-Control', control(isProd, 7));
            const file = `./dist${pathname}`;
            createReadStream(file).pipe(res);
        } else {
            res.setHeader('Content-Type', lookup('*.html'));
            res.setHeader('Cache-Control', control(isProd, 0));
            renderPage(res, pathname, query, TMPDIR, GA_ID);
        }
    } catch (e) {
        console.error(e);
        res.setHeader('Content-Type', lookup('500.txt'));
        res.setHeader('Cache-Control', control(isProd, 0));
        res.statusCode = 500;
        res.end('500 Internal Error');
    }
}).listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});
