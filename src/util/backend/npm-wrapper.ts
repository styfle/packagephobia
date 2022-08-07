import { join } from 'path';
import { unlink } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAysnc = promisify(execFile);
const yarn = join(__dirname, '../../../yarn-cli/lib/cli.js');

export async function npmInstall(cwd: string, cacheDir: string, name: string, version: string) {
    const result = await execFileAysnc(yarn, ['add', `${name}@${version}`], {
        cwd,
        env: {
            ...process.env,
            YARN_CACHE_FOLDER: cacheDir,
            YARN_NPM_REGISTRY_SERVER: process.env.NPM_REGISTRY_URL,
            YARN_NODE_LINKER: 'node-modules',
            //YARN_LOG_FILTERS_LEVEL: 'error',
        },
    });
    if (result.stderr) {
        console.error(result.stderr);
    }
    await unlink(join(cwd, 'node_modules', '.yarn-integrity'));
}

export const packageString = JSON.stringify({
    private: true,
});
