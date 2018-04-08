import 'isomorphic-unfetch';

interface Manifest {
    versions: { [version: string]: any };
    'dist-tags': { latest: string };
}

export async function getLatestVersion(pkg: string) {
    const manifest = await fetchManifest(pkg);
    return manifest['dist-tags'].latest;
}

export async function getMostRecentVersions(pkg: string, limit = 5) {
    const manifest = await fetchManifest(pkg);
    return Object.keys(manifest.versions).slice(-limit);
}

/**
 * Make an API call to npm to get package manifest details
 * @param pkg The npm package name
 */
async function fetchManifest(pkg: string) {
    const encodedPackage = escapePackageName(pkg);
    const response = await fetch(`https://registry.npmjs.com/${encodedPackage}`);
    const manifest: Manifest = await response.json();
    return manifest;
}

/**
 * npm registry expects the slashes in the (scoped) package names to be sent escaped.
 * @param pkg The npm package name
 */
function escapePackageName(pkg: string) {
    return pkg.replace('/', '%2f');
}
