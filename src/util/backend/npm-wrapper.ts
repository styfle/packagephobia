import { join } from 'path';
import { unlink } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAysnc = promisify(execFile);
const yarn = join(__dirname, '../../../public/yarn.js');

export async function npmInstall(cwd: string, cacheDir: string, name: string, version: string) {
    await execFileAysnc(yarn, ['add', `${name}@${version}`], {
        cwd,
        env: {
            ...process.env,
            YARN_CACHE_FOLDER: cacheDir,
            YARN_NPM_REGISTRY_SERVER: process.env.NPM_REGISTRY_URL,
            YARN_NODE_LINKER: 'node-modules',
            YARN_LOG_FILTERS_LEVEL: 'error',
        },
    });
    await unlink(join(cwd, 'node_modules', '.yarn-state.yml'));
}

export const packageString = JSON.stringify({
    name: 'none',
    version: '1.0.0',
    description: 'None',
    main: 'index.js',
    license: 'ISC',
    repository: 'github:npm/cli',
});
