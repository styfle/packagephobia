import { Sandbox } from '@vercel/sandbox';

const teamId = process.env.VERCEL_TEAM_ID || '';
const projectId = process.env.VERCEL_PROJECT_ID || '';
const token = process.env.VERCEL_TOKEN || '';

export async function runInSandbox(name: string, version: string) {
    const sandbox = await Sandbox.create({
        teamId,
        projectId,
        token,
        runtime: 'node22',
        resources: {
            vcpus: 2,
        },
        ports: [3000],
        timeout: 120_000, // 2 minutes
    });

    const whoami = await sandbox.runCommand('whoami');
    console.log(`Running as: ${await whoami.stdout()}`);

    const pwd = await sandbox.runCommand('pwd');
    console.log(`Working dir: ${await pwd.stdout()}`);

    const dush = await sandbox.runCommand('du -sh');
    console.log(`du -sh: ${await dush.stdout()}`);

    const install = await sandbox.runCommand(`npm init -y && npm install ${name}@${version}`);
    console.log(`npm install: ${await install.stdout()}`);

    const node_modules = await sandbox.runCommand('du -sh node_modules');
    console.log(`node_modules: ${await node_modules.stdout()}`);
}
