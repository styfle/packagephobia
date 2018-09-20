import 'isomorphic-unfetch';
import * as semver from 'semver';

const { NPM_REGISTRY_URL = 'https://registry.npmjs.com' } = process.env;

/**
 * Make an API call to npm to get package manifest details
 * @param name The npm package name
 */
export async function fetchManifest(name: string) {
    const encodedPackage = escapePackageName(name);
    const response = await fetch(`${NPM_REGISTRY_URL}/${encodedPackage}`);
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
export function getLatestVersion(manifest: NpmManifest) {
    return manifest['dist-tags'].latest;
}

/**
 * Get all versions of the npm package and order
 * by semver oldest to newest
 */
export function getAllVersions(manifest: NpmManifest) {
    return Object.keys(manifest.versions).sort((a, b) => {
        return semver.gt(a, b) ? 1 : semver.eq(a, b) ? 0 : -1;
    });
}

/**
 * Get the most recent versions of the npm package.
 * Returns (count * 2 + 1) results.
 */
export function getVersionsForChart(allVersions: string[], version: string, count: number) {
    const total = count * 2 + 1;
    const index = allVersions.indexOf(version);
    let start = index - count;
    let end = index + count + 1;

    if (end > allVersions.length) {
        const tmp = allVersions.length - total;
        start = tmp > 0 ? tmp : 0;
    } else if (start < 0) {
        start = 0;
        end = start + total;
    }

    return allVersions.slice(start, end);
}

/**
 * Escape an npm package name.
 * The registry expects the slashes in the (scoped) package names
 * to be sent escaped.
 */
function escapePackageName(name: string) {
    return name.replace('/', '%2f');
}
