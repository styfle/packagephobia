import { parsePackageString } from '../util/npm-parser';
import { findOne, insert } from '../util/backend/db';
import {
    fetchManifest,
    getAllDistTags,
    getAllVersions,
} from '../util/npm-api';
import { calculatePackageSize } from '../util/backend/npm-stats';
import { versionUnknown } from '../util/constants';

async function getSize(name: string, version: string | null, force: boolean, tmpDir: string) {
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

    let pkgSize = await findOne(name, version);
    if (!pkgSize || force) {
        console.log(`Cache miss for ${name}@${version} - running npm install in ${tmpDir}...`);
        const start = new Date();
        pkgSize = await calculatePackageSize(name, version, tmpDir);
        const end = new Date();
        const sec = (end.getTime() - start.getTime()) / 1000;
        console.log(`Calculated size of ${name}@${version} in ${sec}s`);
        insert(pkgSize);
    }


    const result: ComparePackage = {
        pkgSize,
        cacheResult,
        isLatest,
    };
    return result;
}

export async function getCompareProps(query: ParsedUrlQuery, tmpDir: string) {
    if (!query || typeof query.p !== 'string') {
        throw new Error(`Unknown query string ${query}`);
    }
    const packages = query.p.split(',').map(parsePackageString);
    const force = query.force === '1';

    const resultPromises = packages.map(async ({ name, version }) => await getSize(name, version, force, tmpDir));
    const results = await Promise.all(resultPromises);

    return { results };
}

function packageNotFound(name: string) {
    const pkgSize: PkgSize = {
        name,
        version: versionUnknown,
        publishSize: 0,
        installSize: 0,
        disabled: true,
    };
    const result: ResultProps = {
        pkgSize,
        readings: [],
        cacheResult: false,
        isLatest: false,
    };
    return result;
}