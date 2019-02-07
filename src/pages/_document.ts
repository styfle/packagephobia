import { ServerResponse } from 'http';
import { createFactory } from 'react';
import { renderToNodeStream } from 'react-dom/server';

import IndexPage from '../pages/index';
import ResultPage from '../pages/result';
import NotFoundPage from '../pages/404';
import ServerErrorPage from '../pages/500';

const IndexFactory = createFactory(IndexPage);
const ResultFactory = createFactory(ResultPage);
const NotFoundFactory = createFactory(NotFoundPage);
const ServerErrorFactory = createFactory(ServerErrorPage);

import { getResultProps } from '../page-props/results';

import { containerId, pages, hostname } from '../util/constants';
import OctocatCorner from '../components/OctocatCorner';

const existingPaths = new Set(Object.values(pages));
const logoSize = 108;
const title = 'Package Phobia';
const description = 'Find the cost of installing a node dependency';
const css = `
body {
    margin: 0;
    padding: 0;
    background: #fafafa;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;    
}

#spinner {
    background: url(${pages.logo_svg});
    box-sizing: border-box;
    height: ${logoSize}px;
    width: ${logoSize}px;
    margin-top: calc(50vh - ${logoSize / 2}px);
    margin-left: calc(50vw - ${logoSize / 2}px);
    animation: rotate 1s infinite linear;
  }
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 

.content-container {
    display: flex;
}

.stats-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 3rem;
}

@media screen and (max-width: 48em) {
    .content-container {
        flex-wrap: wrap;
    }
    .stats-container {
        margin: 0 auto;
    }

    .bar-graph-container {
        margin: 0 auto;
    }
}`;

export async function renderPage(
    res: ServerResponse,
    pathname: string,
    query: ParsedUrlQuery,
    workingDir: string,
    tmpDir: string,
    gaId: string,
) {
    res.statusCode = getStatusCode(pathname);
    res.write(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#33aa33" />
                <meta name="msapplication-TileColor" content="#333333" />
                <meta name="theme-color" content="#333333" />

                <meta property="og:title" content="${title}" />
                <meta property="og:image" content="https://${hostname}${pages.logo_png}" />
                <meta property="og:description" content="${description}" />

                <title>${title}</title>
                <meta name="description" content="${description}" />
                <style>${css}</style>
            </head>
            <body>
            <div id="spinner"></div>
            <script>document.getElementById('spinner').style.display='block'</script>
            ${OctocatCorner()}
            <div id="${containerId}">`);
    const factory = await routePage(pathname, query, workingDir, tmpDir);
    const stream = renderToNodeStream(factory);
    stream.pipe(
        res,
        { end: false },
    );
    stream.on('end', () => {
        res.end(`</div>
                <script>document.getElementById('spinner').style.display='none'</script>
                <script type="text/javascript">
                    if (window.location.hostname === '${hostname}') {
                        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                        ga('create', '${gaId}', 'auto');
                        ga('send', 'pageview');
                    }
                </script>
            </body>
            </html>`);
    });
}

async function routePage(
    pathname: string,
    query: ParsedUrlQuery,
    workingDir: string,
    tmpDir: string,
) {
    try {
        switch (pathname) {
            case pages.index:
                return IndexFactory();
            case pages.result:
                return ResultFactory(await getResultProps(query, workingDir, tmpDir));
            default:
                return NotFoundFactory();
        }
    } catch (e) {
        console.error(`ERROR: ${e.message}`);
        return ServerErrorFactory();
    }
}

function getStatusCode(pathname: string) {
    if (existingPaths.has(pathname)) {
        return 200;
    }
    return 404;
}
