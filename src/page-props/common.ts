import { findOne, insert } from '../util/backend/db';
import { getAllDistTags } from '../util/npm-api';
import { calculatePackageSize } from '../util/backend/npm-stats';
import { versionUnknown } from '../util/constants';
import type { NpmManifest, PkgSize } from '../types';

export async function getPkgDetails(
    manifest: NpmManifest | null,
    name: string,
    version: string | null,
    force: boolean,
    tmpDir: string,
) {
    let cacheResult = true;
    let isLatest = false;

    if (!manifest) {
        console.error(`Package "${name}" does not exist in npm`);
        return packageNotFound(name);
    }

    const tagToVersion = getAllDistTags(manifest);
    if (!version) {
        version = tagToVersion.latest;
        isLatest = true;
        cacheResult = false;
    } else if (typeof tagToVersion[version] !== 'undefined') {
        version = tagToVersion[version] || '';
        cacheResult = false;
    }

    const allVersions = manifest.versions;
    if (!allVersions.includes(version)) {
        console.error(`Version ${name}@${version} does not exist in npm`);
        return packageNotFound(name);
    }

    let pkgSize = await findOne(name, version);
    if (!pkgSize || force) {
        console.log(`Cache miss - running "npm i ${name}@${version}" in ${tmpDir}...`);
        const start = new Date();
        pkgSize = await calculatePackageSize(name, version, tmpDir);
        const end = new Date();
        const sec = (end.getTime() - start.getTime()) / 1000;
        console.log(`Calculated size of ${name}@${version} in ${sec}s`);
        insert(pkgSize);
    }

    const result = {
        pkgSize,
        cacheResult,
        isLatest,
        allVersions,
    };
    return result;
}

function packageNotFound(name: string) {
    const pkgSize: PkgSize = {
        name,
        version: versionUnknown,
        publishSize: 0,
        installSize: 0,
        publishFiles: 0,
        installFiles: 0,
        disabled: true,
    };
    const result = {
        pkgSize,
        cacheResult: false,
        isLatest: false,
        allVersions: [],
        manifest: null,
    };
    return result;
}
