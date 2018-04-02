import { createServer } from 'http';
import { parse } from 'url';
import { createReadStream } from 'fs';
import { createFactory } from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { getPackageSize } from './pkg-stats';
import { parsePackageString } from './parse-utils';
import { getLatestVersion } from './npm-api';
import { lookup } from './mime-types';
import { control } from './cache-control';

import {
    faviconUrl,
    reactUrl,
    reactDomUrl,
    browserUrl,
    browserMapUrl,
    containerId,
} from './constants';

import Index from './pages/index';
const AppFactory = createFactory(Index);

const { TMPDIR='/tmp', PORT=3107, NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const suffix = isProd ? '.production.min.js' : '.development.js';
console.log('isProduction: ', isProd);

createServer(async (req, res) => {
    let { httpVersion, method, url } = req;
    console.log(`${httpVersion} ${method} ${url}`);
    let { pathname='/', query={} } = parse(req.url || '', true);
    if (!url || url === '/') {
        url = 'index.html';
    }
    try {
        if (url === 'index.html') {
            res.setHeader('Content-Type', lookup(url));
            res.setHeader('Cache-Control', control(isProd, 1));
            res.write(`<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="${faviconUrl}" rel="icon" type="image/x-icon" />
                <title>React Example</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background: #fafafa;
                        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
                    }
                </style>
            </head>
            <body>
            <div id="${containerId}">`);
            const stream = renderToNodeStream(AppFactory());
            stream.pipe(res, { end: false });
            stream.on('end', () => {
                res.end(`</div>
                <script src="${reactUrl}"></script>
                <script src="${reactDomUrl}"></script>
                <script src="${browserUrl}"></script>
            </body>
            </html>`);
            });
        } else if (url === reactUrl || url === reactDomUrl) {
            res.setHeader('Content-Type', lookup(url));
            res.setHeader('Cache-Control', control(isProd, 7));
            const name = url.replace('.js', '');
            const file = `./node_modules${name}/umd${name}${suffix}`;
            createReadStream(file).pipe(res);
        } else if (url === browserUrl || url === browserMapUrl) {
            res.setHeader('Content-Type', lookup(url));
            res.setHeader('Cache-Control', control(isProd, 7));
            const file = `./dist${url}`;
            createReadStream(file).pipe(res);
        } else if (pathname === '/query' && query.package && typeof query.package === 'string') {
            const { name, version } = parsePackageString(query.package);
            const ver = version ||  await getLatestVersion(name);
            const obj = await getPackageSize(name, ver, TMPDIR);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(obj));
        } else {
            url = 'notfound.txt';
            res.setHeader('Content-Type', lookup(url));
            res.setHeader('Cache-Control', control(isProd, 0));
            res.statusCode = 404;
            res.end('404 Not Found');
        }
    } catch (e) {
        console.error(e);
        url = 'notfound.txt';
        res.setHeader('Content-Type', lookup(url));
        res.setHeader('Cache-Control', control(isProd, 0));
        res.statusCode = 500;
        res.end('500 Internal Error');
    }
}).listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});
