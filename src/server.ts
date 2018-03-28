import { createServer } from 'http';
import { parse } from 'url';
import * as next from 'next';
import { getPackageSize } from './pkg-stats';

const { TMPDIR='/tmp', PORT=3007, NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
console.log('isProduction: ', isProduction);
const app = next({ dev: !isProduction });

app.prepare().then(() => {
    createServer(async (req, res) => {
        let { httpVersion, method, url } = req;
        console.log(`${httpVersion} ${method} ${url}`);
        const { pathname='/', query={} } = parse(req.url || '', true);
        if (pathname === '/' && query.package && typeof query.package === 'string') {
            const size = await getPackageSize(query.package);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ size }));
        } else {
            app.render(req, res, pathname, query);
        }
    }).listen(PORT, () => {
        console.log(`Listening on ${PORT}...`);
    });
});
