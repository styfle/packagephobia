import { join } from 'path';
import { unlink } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAysnc = promisify(execFile);
const npm = join(require.resolve('npm'), '../bin/npm-cli.js');

export async function npmInstall(
    cwd: string,
    cacheDir: string,
    name: string,
    version: string,
    signal: AbortSignal,
) {
    const result = await execFileAysnc(npm, ['i', `${name}@${version}`], {
        cwd,
        signal,
        env: {
            ...process.env,
            // See https://docs.npmjs.com/cli/v10/commands/npm#configuration
            npm_config_audit: 'false',
            npm_config_update_notifier: 'false',
            npm_config_package_lock: 'false',
            npm_config_progress: 'false',
            npm_config_silent: 'true',
            npm_config_cache: cacheDir,
            npm_config_registry: process.env.NPM_REGISTRY_URL,
            // Omit peerDependencies to match legacy behavior from npm@6 and `yarn@1`
            npm_config_omit: 'peer',
        },
    });
    if (result.stderr) {
        console.error('npm install error', result.stderr);
    }
    await unlink(join(cwd, 'node_modules', '.package-lock.json'));
}

export const packageString = JSON.stringify({
    private: true,
    name: 'none',
    version: '1.0.0',
});
