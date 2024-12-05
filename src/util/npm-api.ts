import https from 'https';
import semver from 'semver';
import { LRUCache } from 'lru-cache';
import { NotFoundError } from './not-found-error';
import type { NpmManifest } from '../types';

const { NPM_REGISTRY_URL = 'https://registry.npmjs.com' } = process.env;
const cache = new LRUCache<string, NpmManifest>({ max: 5000, ttl: 1000 * 60 * 5 });

/**
 * Make an API call to npm to get package manifest details
 * @param name The npm package name
 */
export async function fetchManifest(name: string) {
    let cachedManifest = cache.get(name);
    if (cachedManifest) {
        // fetch can take 2000ms or slower so we cache
        console.log('lrucache hit');
        return cachedManifest;
    }
    console.log('lrucache miss');
    const encodedPackage = escapePackageName(name);
    const startTime = Date.now();
    const manifest = await fetchJSON(`${NPM_REGISTRY_URL}/${encodedPackage}`);
    console.log(`fetchJSON ${Date.now() - startTime}ms`);
    if (!isManifest(manifest)) {
        throw new NotFoundError({ resource: name });
    }
    // only cache some properties and sort the versions by semver
    cachedManifest = {
        name: manifest.name,
        description: manifest.description,
        versions: getAllVersions(manifest),
        modified: manifest.modified,
        'dist-tags': manifest['dist-tags'],
    };
    cache.set(name, cachedManifest);
    return cachedManifest;
}

function isManifest(obj: unknown): obj is NpmManifest {
    return typeof obj === 'object' && obj !== null && 'name' in obj && 'dist-tags' in obj;
}

function fetchJSON(url: string) {
    const { hostname, port, pathname } = new URL(url);
    const options: https.RequestOptions = {
        method: 'GET',
        port: port || 443,
        hostname: hostname,
        path: pathname,
        headers: {
            Accept: 'application/vnd.npm.install-v1+json',
            'User-Agent': 'packagephobia.com',
        },
    };

    return new Promise<NpmManifest | null>((resolve, reject) => {
        const req = https.request(options, res => {
            res.setEncoding('utf8');

            if (res.statusCode === 404) {
                resolve(null);
                return;
            }

            let str = '';
            res.on('data', data => {
                str += data;
            });
            res.on('end', () => {
                if (str?.startsWith('{')) {
                    resolve(JSON.parse(str));
                } else {
                    resolve(null);
                }
            });
        });

        req.on('error', error => {
            reject(error);
        });

        req.end();
    });
}

/**
 * Get all the published npm dist tags
 * which returns object {tagname => version}
 */
export function getAllDistTags(manifest: NpmManifest) {
    return manifest['dist-tags'];
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
    return name.replace(/\//g, '%2f');
}
