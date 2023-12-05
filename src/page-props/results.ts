import { isFullRelease } from '../util/npm-parser';
import { findAll } from '../util/backend/db';
import { getAllDistTags, getVersionsForChart } from '../util/npm-api';
import { getPkgDetails } from './common';
import { NotFoundError } from '../util/not-found-error';
import type { NpmManifest, PackageVersion, ResultProps } from '../types';

export async function getResultProps(
    inputStr: string,
    pkgVersions: PackageVersion[],
    manifest: NpmManifest | null,
    force: boolean,
    tmpDir: string,
): Promise<ResultProps> {
    const parsed = pkgVersions[0];
    if (!parsed) {
        throw new Error('Expected one or more versions');
    }
    if (!manifest) {
        throw new NotFoundError({ resource: parsed.name });
    }
    const { pkgSize, allVersions, cacheResult, isLatest } = await getPkgDetails(
        manifest,
        parsed.name,
        parsed.version,
        force,
        tmpDir,
    );

    const { name, version } = pkgSize;
    const tagToVersion = getAllDistTags(manifest);

    const filteredVersions =
        pkgVersions.length > 1
            ? pkgVersions.map(p => tagToVersion[p.version || ''] || p.version).filter(notEmpty)
            : isFullRelease(version)
            ? allVersions.filter(isFullRelease)
            : allVersions;

    const chartVersions = getVersionsForChart(filteredVersions, version, 7);

    const cachedVersions = await findAll(name);

    const readings = chartVersions.map(v => {
        return (
            cachedVersions[v] || {
                name: name,
                version: v,
                publishSize: 0,
                installSize: 0,
                publishFiles: 0,
                installFiles: 0,
                disabled: true,
            }
        );
    });

    return {
        pkgSize,
        readings,
        cacheResult,
        isLatest,
        inputStr,
    };
}

function notEmpty<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}
