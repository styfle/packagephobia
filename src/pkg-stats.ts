import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import * as child_process from 'child_process';
const exec = promisify(child_process.exec);

// TODO: Can this be optimized by changing sync to async?
function getDirSize(root: string, size = 0): number {
    const stats = lstatSync(root);

    if (!stats.isDirectory()) {
        return stats.size + size;
    }

    return readdirSync(root)
        .map(file => getDirSize(join(root, file)))
        .reduce((acc, num) => acc + num, size);
}

export async function calculatePackageSize(name: string, version: string, tmpDir = '/tmp') {
    const tmpPackage = 'tmp-package' + Math.random();
    const pkgDir = join(tmpDir, tmpPackage);
    const nodeModules = join(pkgDir, 'node_modules');
    await exec(`mkdir ${tmpPackage}`, { cwd: tmpDir });
    await exec(`npm init -y`, { cwd: pkgDir });
    await exec(`npm install --save ${name}@${version}`, { cwd: pkgDir });
    const installSize = getDirSize(nodeModules);
    const publishSize = getDirSize(join(nodeModules, name));
    await exec(`rm -rf ${tmpPackage}`, { cwd: tmpDir });
    const output: PkgSize = { name, version, publishSize, installSize };
    return output;
}
