import { ServerResponse } from 'http';
import { createFactory } from 'react';
import { renderToNodeStream } from 'react-dom/server';

import IndexPage from '../pages/index';
import ResultPage from '../pages/result';
import AboutPage from '../pages/about';
import NotFoundPage from '../pages/404';
import ServerErrorPage from '../pages/500';

const IndexFactory = createFactory(IndexPage);
const ResultFactory = createFactory(ResultPage);
const AboutFactory = createFactory(AboutPage);
const NotFoundFactory = createFactory(NotFoundPage);
const ServerErrorFactory = createFactory(ServerErrorPage);

import { getResultProps } from '../page-props/results';

import { faviconUrl, containerId, pages, hostname } from '../util/constants';

const existingPaths = new Set(Object.values(pages));

const css = `
body {
    margin: 0;
    padding: 0;
    background: #fafafa;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;    
}

#spinner {
    box-sizing: border-box;
    height: 60px;
    width: 60px;
    margin-top: calc(50vh - 60px);
    margin-left: calc(50vw - 60px);
    border: 0px;
    border-radius: 50%;
    box-shadow: 0 -20px 0 24px #65C3F8 inset;
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
    tmpDir: string,
    gaId: string,
) {
    res.statusCode = getStatusCode(pathname);
    res.write(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="${faviconUrl}" rel="icon" type="image/x-icon" />
                <title>PackagePhobia | find the cost of adding a dev dependency</title>
                <style>${css}</style>
            </head>
            <body>
            <div id="spinner"></div>
            <script>document.getElementById('spinner').style.display='block'</script>
            <div id="${containerId}">`);
    const factory = await routePage(pathname, query, tmpDir);
    const stream = renderToNodeStream(factory);
    stream.pipe(res, { end: false });
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

async function routePage(pathname: string, query: ParsedUrlQuery, tmpDir: string) {
    try {
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
    } catch (e) {
        return ServerErrorFactory();
    }
}

function getStatusCode(pathname: string) {
    if (existingPaths.has(pathname)) {
        return 200;
    }
    return 404;
}
