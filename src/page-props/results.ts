import { parsePackageString, isFullRelease } from '../util/npm-parser';
import { findAll, findOne, insert } from '../util/backend/db';
import {
    fetchManifest,
    getLatestVersion,
    getVersionsForChart,
    getAllVersions,
} from '../util/npm-api';
import { calculatePackageSize } from '../util/backend/npm-stats';
import { versionUnknown } from '../util/constants';
import { tmpdir } from 'os';

export async function getResultProps(query: ParsedUrlQuery, tmp: string) {
    if (!query || typeof query.p !== 'string') {
        throw new Error(`Unknown query string ${query}`);
    }
    let { name, version } = parsePackageString(query.p);
    let manifest: NpmManifest;
    let cacheResult = true;

    try {
        manifest = await fetchManifest(name);
    } catch (e) {
        console.error(`Package ${name} does not exist in npm`);
        return packageNotFound(name);
    }

    if (!version) {
        version = await getLatestVersion(manifest);
        cacheResult = false;
        console.log(`Querystring missing version, using version ${name}@${version}`);
    }

    const allVersions = getAllVersions(manifest);
    if (!allVersions.includes(version)) {
        console.error(`Version ${name}@${version} does not exist in npm`);
        return packageNotFound(name);
    }

    const filteredVersions = isFullRelease(version)
        ? allVersions.filter(isFullRelease)
        : allVersions;
    const chartVersions = getVersionsForChart(filteredVersions, version, 7);

    let existing = await findOne(name, version);
    if (!existing) {
        console.log(`Cache miss for ${name}@${version} - running npm install in ${tmpdir}...`);
        const start = new Date();
        existing = await calculatePackageSize(name, version, tmp);
        const end = new Date();
        const sec = (end.getTime() - start.getTime()) / 1000;
        console.log(`Calculated size of ${name}@${version} in ${sec}s`);
        insert(existing);
    }

    const cachedVersions = await findAll(name);

    const readings = chartVersions.map(v => {
        if (v in cachedVersions) {
            return cachedVersions[v];
        } else {
            return {
                name: name,
                version: v,
                publishSize: 0,
                installSize: 0,
                disabled: true,
            };
        }
    });

    const result: ResultProps = { pkgSize: existing, readings, cacheResult };
    return result;
}

function packageNotFound(name: string) {
    const pkgSize: PkgSize = {
        name,
        version: versionUnknown,
        publishSize: 0,
        installSize: 0,
        disabled: true,
    };
    const result: ResultProps = { pkgSize, readings: [], cacheResult: false };
    return result;
}
