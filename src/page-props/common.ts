import { findOne, insert } from '../util/backend/db';
import { fetchManifest, getAllDistTags, getAllVersions, getPublishDate } from '../util/npm-api';
import { calculatePackageSize } from '../util/backend/npm-stats';
import { versionUnknown } from '../util/constants';

export async function getPkgDetails(
    name: string,
    version: string | null,
    force: boolean,
    tmpDir: string,
) {
    let manifest: NpmManifest;
    let cacheResult = true;
    let isLatest = false;

    try {
        manifest = await fetchManifest(name);
    } catch (e) {
        console.error(`Package ${name} does not exist in npm`);
        return packageNotFound(name);
    }

    const tagToVersion = getAllDistTags(manifest);
    if (!version) {
        version = tagToVersion['latest'];
        isLatest = true;
        cacheResult = false;
    } else if (typeof tagToVersion[version] !== 'undefined') {
        version = tagToVersion[version];
        cacheResult = false;
    }

    const allVersions = getAllVersions(manifest);
    if (!allVersions.includes(version)) {
        console.error(`Version ${name}@${version} does not exist in npm`);
        return packageNotFound(name);
    }

    const publishDate = getPublishDate(manifest, version);
    let pkgSize = await findOne(name, version);
    if (!pkgSize || force) {
        console.log(`Cache miss for ${name}@${version} - running npm install in ${tmpDir}...`);
        const start = new Date();
        pkgSize = await calculatePackageSize(name, version, publishDate, tmpDir);
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
        manifest,
    };
    return result;
}

function packageNotFound(name: string) {
    const pkgSize: PkgSize = {
        name,
        version: versionUnknown,
        publishDate: new Date().toUTCString(),
        publishSize: 0,
        installSize: 0,
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
