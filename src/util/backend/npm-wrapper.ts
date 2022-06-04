import { join } from 'path';
import { unlink } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAysnc = promisify(execFile);
const yarn = join(__dirname, '../../../public/yarn.js');

export async function npmInstall(where: string, cacheDir: string, name: string, version: string) {
    await execFileAysnc(yarn, ['install', '--cache-dir', cacheDir, `${name}@${version}`], {
        cwd: where,
    });
    /*
            npm.config.set('cache', cacheDir);
            npm.config.set('audit', false);
            npm.config.set('update-notifier', false);
            npm.config.set('package-lock', false);
            npm.config.set('progress', false);
            npm.config.set('silent', true);
    */
}

export const packageString = JSON.stringify({
    name: 'none',
    version: '1.0.0',
    description: 'None',
    main: 'index.js',
    license: 'ISC',
    repository: 'github:npm/cli',
});
