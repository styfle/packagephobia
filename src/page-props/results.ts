import { parsePackageString, isFullRelease } from '../util/npm-parser';
import { findAll } from '../util/backend/db';
import { getVersionsForChart, getPublishDate } from '../util/npm-api';
import { getPkgDetails } from './common';

export async function getResultProps(query: ParsedUrlQuery, tmpDir: string): Promise<ResultProps> {
    if (!query || typeof query.p !== 'string') {
        throw new Error(`Unknown query string ${query}`);
    }
    const parsed = parsePackageString(query.p);
    const force = query.force === '1';
    const { pkgSize, allVersions, cacheResult, isLatest, manifest } = await getPkgDetails(
        parsed.name,
        parsed.version,
        force,
        tmpDir,
    );
    const { name, version } = pkgSize;

    const filteredVersions = isFullRelease(version)
        ? allVersions.filter(isFullRelease)
        : allVersions;

    const chartVersions = getVersionsForChart(filteredVersions, version, 7);

    const cachedVersions = await findAll(name);

    const readings = chartVersions.map(v => {
        if (v in cachedVersions) {
            return cachedVersions[v];
        } else {
            return {
                name: name,
                version: v,
                publishDate: getPublishDate(manifest, v),
                publishSize: 0,
                installSize: 0,
                publishFiles: 0,
                installFiles: 0,
                disabled: true,
            };
        }
    });

    return {
        pkgSize,
        readings,
        cacheResult,
        isLatest,
    };
}
