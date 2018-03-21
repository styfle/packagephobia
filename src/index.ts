const { createServer } = require('http');
const { parse } = require('url');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);

const { TMPDIR='/tmp', PORT=3107 } = process.env;


function getDirSize(root, size=0) {
    const itemStats = lstatSync(root);

    if (!itemStats.isDirectory()) {
        return itemStats.size + size;
    }

    return readdirSync(root)
        .map(file => getDirSize(join(root, file)))
        .reduce((acc, num) => acc + num, size);
}

async function getPackageSize(package) {
    console.log(`getPackageSize(${package})`);
    const tmpPackage = 'tmp-package' + Math.random();
    const pkgDir = join(TMPDIR, tmpPackage);
    const nodeModules = join(pkgDir, 'node_modules');
    console.log({ TMPDIR, tmpPackage, pkgDir, nodeModules });
    await exec(`mkdir ${tmpPackage}`, { cwd: TMPDIR });
    await exec(`npm init -y`, { cwd: pkgDir });
    await exec(`npm install --save ${package}`, { cwd: pkgDir });
    const size = getDirSize(nodeModules);
    console.log(`Size of ${package}: ${size} bytes`);
    await exec(`rm -rf ${tmpPackage}`, { cwd: TMPDIR });
    return size;
}

createServer(async (req, res) => {
    let { httpVersion, method, url } = req;
    console.log(`${httpVersion} ${method} ${url}`);
    const { query } = parse(req.url, true);
    if (query && query.package) {
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