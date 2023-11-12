import { fetchManifest } from '../util/npm-api';
import { getPkgDetails } from './common';
import type { CompareProps, PackageVersion } from '../types';

export async function getCompareProps(
    inputStr: string,
    pkgVersions: PackageVersion[],
    force: boolean,
    tmpDir: string,
): Promise<CompareProps> {
    const promises = pkgVersions.map(async ({ name, version }) => {
        const manifest = await fetchManifest(name);
        return getPkgDetails(manifest, name, version, force, tmpDir);
    });
    const results = await Promise.all(promises);

    return { inputStr, results };
}
