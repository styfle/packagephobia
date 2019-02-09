const npm = require('npm');
const install = require('npm/lib/install');

export function npmInstall(where: string, name: string, version: string) {
    return new Promise((resolve, reject) => {
        npm.load((err: Error | undefined) => {
            if (err) {
                reject(err);
                return;
            }
            npm.config.set('audit', false);
            npm.config.set('package-lock', false);
            npm.config.set('progress', false);
            if (process.env.NPM_REGISTRY_URL) {
                npm.config.set('registry', process.env.NPM_REGISTRY_URL);
            }
            const args = [`${name}@${version}`];
            install(where, args, () => resolve());
        });
    });
}
