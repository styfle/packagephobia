import { lstatSync, readdirSync, mkdir, writeFile } from 'fs';
import { join } from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);
const execFileAsync = promisify(execFile);
import { npmInstall, packageString } from './npm-wrapper';
import type { PkgSize } from '../../types';

// TODO: Can this be optimized by changing sync to async?
export function getDirSize(root: string, seen: Set<number>): number {
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
    const controller = new AbortController();

    let t = setTimeout(
        async () => {
            console.error(`Aborting npm install and deleting ${tmpPackage}`);
            controller.abort();
            await execFileAsync('rm', ['-rf', tmpPackage], { cwd: tmpDir });
        },
        26 * 1000, // timeout after 26 seconds since max duration is 30 seconds
    );

    const pkgDir = join(tmpDir, tmpPackage);
    const cacheDir = join(tmpDir, 'cache');
    const packageJson = join(pkgDir, 'package.json');
    const nodeModules = join(pkgDir, 'node_modules');
    await mkdirAsync(pkgDir);
    await writeFileAsync(packageJson, packageString, 'utf8');
    await npmInstall(pkgDir, cacheDir, name, version, controller.signal);
    const installFiles = new Set<number>();
    const installSize = getDirSize(nodeModules, installFiles);
    const publishFiles = new Set<number>();
    const publishSize = getDirSize(join(nodeModules, name), publishFiles);
    const output: PkgSize = {
        name,
        version,
        publishSize,
        installSize,
        publishFiles: publishFiles.size,
        // Subtract 1 to exclude `node_modules` root dir
        installFiles: installFiles.size - 1,
    };
    clearTimeout(t);
    await execFileAsync('rm', ['-rf', tmpPackage], { cwd: tmpDir });

    return output;
}
