const npm = require('npm');
const install = require('npm/lib/install');

export function npmInstall(where: string, cacheDir: string, name: string, version: string) {
    return new Promise((resolve, reject) => {
        npm.load((err?: Error) => {
            if (err) {
                reject(err);
                return;
            }

            npm.config.set('cache', cacheDir);
            npm.config.set('audit', false);
            npm.config.set('update-notifier', false);
            npm.config.set('package-lock', false);
            npm.config.set('progress', false);
            npm.config.set('silent', true);

            if (process.env.NPM_REGISTRY_URL) {
                npm.config.set('registry', process.env.NPM_REGISTRY_URL);
            }

            install(where, [`${name}@${version}`], (err?: Error) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
}


export const packageString = JSON.stringify({
    name: 'none',
    version: '1.0.0',
    description: 'None',
    main: 'index.js',
    license: 'ISC',
    repository: 'github:npm/cli',
});
