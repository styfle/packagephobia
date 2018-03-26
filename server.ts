import { createServer } from 'http';
import { parse } from 'url';
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import * as child_process from 'child_process'; 
const exec = promisify(child_process.exec);
const { TMPDIR='/tmp', PORT=3107 } = process.env;

function getDirSize(root: string, size=0): number {
    const stats = lstatSync(root);

    if (!stats.isDirectory()) {
        return stats.size + size;
    }

    return readdirSync(root)
        .map(file => getDirSize(join(root, file)))
        .reduce((acc, num) => acc + num, size);
}

async function getPackageSize(pkg: string) {
    console.log(`getPackageSize(${pkg})`);
    const tmpPackage = 'tmp-package' + Math.random();
    const pkgDir = join(TMPDIR, tmpPackage);
    const nodeModules = join(pkgDir, 'node_modules');
    console.log({ TMPDIR, tmpPackage, pkgDir, nodeModules });
    await exec(`mkdir ${tmpPackage}`, { cwd: TMPDIR });
    await exec(`npm init -y`, { cwd: pkgDir });
    await exec(`npm install --save ${pkg}`, { cwd: pkgDir });
    const size = getDirSize(nodeModules);
    console.log(`Size of ${pkg}: ${size} bytes`);
    await exec(`rm -rf ${tmpPackage}`, { cwd: TMPDIR });
    return size;
}

createServer(async (req, res) => {
    let { httpVersion, method, url } = req;
    console.log(`${httpVersion} ${method} ${url}`);
    const { query } = parse(req.url || '', true);
    if (query && query.package && typeof query.package === 'string') {
        const size = await getPackageSize(query.package);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ size }));
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Please provide a "package" query string' }));
    }
}).listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});