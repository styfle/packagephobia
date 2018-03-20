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
    const TMPPACKAGE = 'tmp-package' + Math.random();
    const PACKAGEDIR = join(TMPDIR, TMPPACKAGE);
    const NODEMODULES = join(PACKAGEDIR, 'node_modules');
    console.log({ TMPDIR, TMPPACKAGE, PACKAGEDIR, NODEMODULES });
    await exec(`mkdir ${TMPPACKAGE}`, { cwd: TMPDIR });
    await exec(`npm init -y`, { cwd: PACKAGEDIR });
    await exec(`npm install --save ${package}`, { cwd: PACKAGEDIR });
    const size = getDirSize(NODEMODULES);
    console.log(`Size of ${package}: ${size} bytes`);
    await exec(`rm -rf ${TMPPACKAGE}`, { cwd: TMPDIR });
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