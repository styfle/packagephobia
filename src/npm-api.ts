import 'isomorphic-unfetch';

/**
 * Make an API call to npm to get package manifest details
 * @param name The npm package name
 */
export async function fetchManifest(name: string) {
    const encodedPackage = escapePackageName(name);
    const response = await fetch(`https://registry.npmjs.com/${encodedPackage}`);
    const manifest: NpmManifest = await response.json();
    if (response.status === 404 || !manifest || Object.keys(manifest).length === 0) {
        throw new Error('Package not found');
    }
    if (manifest.time.unpublished) {
        throw new Error('Package was unpublished');
    }
    return manifest;
}

/**
 * Get the latest/newest version of the npm package
 */
export async function getLatestVersion(manifest: NpmManifest) {
    return manifest['dist-tags'].latest;
}

/**
 * Get the most recent versions of the npm package
 */
export async function getMostRecentVersions(manifest: NpmManifest, limit: number) {
    return Object.keys(manifest.versions).slice(-limit);
}

/**
 * Escape an npm package name.
 * The registry expects the slashes in the (scoped) package names
 * to be sent escaped.
 */
function escapePackageName(name: string) {
    return name.replace('/', '%2f');
}
