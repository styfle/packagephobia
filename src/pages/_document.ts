import { ServerResponse } from 'http';
import { createFactory } from 'react';
import { renderToNodeStream } from 'react-dom/server';

import IndexPage from '../pages/index';
import ResultPage from '../pages/result';
import AboutPage from '../pages/about';
import NotFoundPage from '../pages/404';

const IndexFactory = createFactory(IndexPage);
const ResultFactory = createFactory(ResultPage);
const AboutFactory = createFactory(AboutPage);
const NotFoundFactory = createFactory(NotFoundPage);

import { getResultProps } from '../page-props/results';

import {
    faviconUrl,
    containerId,
    reactUrl,
    reactDomUrl,
    browserUrl,
    pages,
} from '../constants';

const exisitingPaths = new Set(Object.values(pages));

const css = 
` body {
    margin: 0;
    padding: 0;
    background: #fafafa;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
}`;

export async function renderPage(res: ServerResponse, pathname: string, query: ParsedUrlQuery, tmpDir: string) {
    res.statusCode = getStatusCode(pathname);
    res.write(`<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="${faviconUrl}" rel="icon" type="image/x-icon" />
                <title>PackagePhobia | find the cost of adding a dev dependency</title>
                <style>${css}</style>
            </head>
            <body>
            <div id="${containerId}">`);
            const factory = await routePage(pathname, query, tmpDir);
            const stream = renderToNodeStream(factory);
            stream.pipe(res, { end: false });
            stream.on('end', () => {
                res.end(`</div>
                <script src="${reactUrl}"></script>
                <script src="${reactDomUrl}"></script>
                <script src="${browserUrl}"></script>
            </body>
            </html>`);
            });
}

async function routePage(pathname: string, query: ParsedUrlQuery, tmpDir: string) {
    switch (pathname) {
        case pages.index:
            return IndexFactory();
        case pages.result:
            return ResultFactory(await getResultProps(query, tmpDir));
        case pages.about:
            return AboutFactory();
        default:
            return NotFoundFactory();
    }
}

function getStatusCode(pathname: string) {
    if (exisitingPaths.has(pathname)) {
        return 200;
    }
    return 404;
}