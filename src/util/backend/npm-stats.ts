import { lstatSync, readdirSync, mkdir, writeFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);
import { npmInstall } from './npm-wrapper';

const packageString = JSON.stringify({
    name: 'none',
    version: '1.0.0',
    description: 'None',
    main: 'index.js',
    license: 'ISC',
    repository: 'github:npm/cli',
});

// TODO: Can this be optimized by changing sync to async?
export function getDirSize(root: string, seen = new Set()): number {
    const stats = lstatSync(root);

    if (seen.has(stats.ino)) {
        return 0;
    }

    seen.add(stats.ino);

    if (!stats.isDirectory()) {
        return stats.size;
    }

    return readdirSync(root)
        .map(file => getDirSize(join(root, file), seen))
        .reduce((acc, num) => acc + num, 0);
}

export async function calculatePackageSize(name: string, version: string, tmpDir: string) {
    const tmpPackage = 'tmp-package' + Math.random();
    const pkgDir = join(tmpDir, tmpPackage);
    const cacheDir = join(tmpDir, 'npm-cache');
    const packageJson = join(pkgDir, 'package.json');
    const nodeModules = join(pkgDir, 'node_modules');
    await mkdirAsync(pkgDir);
    await writeFileAsync(packageJson, packageString, 'utf8');
    await npmInstall(pkgDir, cacheDir, name, version);
    const installSize = getDirSize(nodeModules);
    const publishSize = getDirSize(join(nodeModules, name));
    //await execFile('rm', ['-rf', tmpPackage], { cwd: tmpDir });
    const output: PkgSize = { name, version, publishSize, installSize };
    return output;
}
