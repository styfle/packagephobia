import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import * as child_process from 'child_process';
const execFile = promisify(child_process.execFile);

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
    const nodeModules = join(pkgDir, 'node_modules');
    const npm = join(process.env.PWD || '', 'node_modules', 'npm', 'bin', 'npm-cli.js');
    await execFile('mkdir', [tmpPackage], { cwd: tmpDir });
    await execFile(npm, ['init', '-y'], { cwd: pkgDir });
    await execFile(npm, ['i', '--no-package-lock', '--no-audit', `${name}@${version}`], {
        cwd: pkgDir,
        timeout: 60000,
    });
    const installSize = getDirSize(nodeModules);
    const publishSize = getDirSize(join(nodeModules, name));
    await execFile('rm', ['-rf', tmpPackage], { cwd: tmpDir });
    const output: PkgSize = { name, version, publishSize, installSize };
    return output;
}
