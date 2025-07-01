import { Sandbox } from '@vercel/sandbox';
import type { PkgSize } from '../../types';

export async function runInSandbox(name: string, version: string): Promise<PkgSize> {
    const sandbox = await Sandbox.create({
        runtime: 'node22',
        resources: {
            vcpus: 2,
        },
        ports: [3000],
        timeout: 120_000, // 2 minutes
    });

    const whoami = await sandbox.runCommand('whoami');
    console.log(`Running as: ${await whoami.stdout()}`);

    const which = await sandbox.runCommand('which node');
    console.log(`which: ${await which.stdout()}`);

    const pwd = await sandbox.runCommand('pwd');
    console.log(`Working dir: ${await pwd.stdout()}`);

    const init = await sandbox.runCommand(`npm init -y`);
    console.log(`npm init: ${await init.stdout()}`);

    const install = await sandbox.runCommand(`npm init -y && npm install ${name}@${version}`);
    console.log(`npm install: ${await install.stdout()}`);

    const node_modules = await sandbox.runCommand('du -sh node_modules');
    console.log(`node_modules: ${await node_modules.stdout()}`);

    return {
        name,
        version,
        publishSize: 0, // Placeholder, implement actual size calculation
        installSize: 0, // Placeholder, implement actual size calculation
        publishFiles: 0, // Placeholder, implement actual file count
        installFiles: 0, // Placeholder, implement actual file count
    };
}
