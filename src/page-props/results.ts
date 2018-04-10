import { parsePackageString } from '../parse-utils';
import { findAll, findOne, insert } from '../db';
import { fetchManifest, getLatestVersion, getMostRecentVersions } from '../npm-api';
import { calculatePackageSize } from '../pkg-stats';

export async function getResultProps(query: ParsedUrlQuery, tmp: string) {
    if (query && typeof query.p === 'string') {
        let { name, version } = parsePackageString(query.p);
        let manifest: NpmManifest;
        try {
            manifest = await fetchManifest(name);
        } catch (e) {
            console.error(`Package ${name} does not exist in npm`);
            const pkgSize: PkgSize = {
                name,
                version: version || 'unknown',
                publishSize: 0,
                installSize: 0,
                disabled: true,
            };
            const result: ResultProps = { pkgSize, readings: [] };
            return result;
        }

        if (!version) {
            version = await getLatestVersion(manifest);
            console.log(`Querystring missing ${name} version, using ${version}`);
        }

        let existing = await findOne(name, version);
        if (!existing) {
            console.log(`Cache miss for ${name}@${version}...`);
            const start = new Date();
            existing = await calculatePackageSize(name, version, tmp);
            const end = new Date();
            const sec = (end.getTime() - start.getTime()) / 1000;
            console.log(`Calculated size of ${name}@${version} in ${sec}s`);
            insert(existing);
        }

        const mostRecentVersions = await getMostRecentVersions(manifest, 15);
        const cachedVersions = await findAll(name);

        const readings = mostRecentVersions.map(v => {
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
        const result: ResultProps = { pkgSize: existing, readings };
        return result;
    }

    throw new Error(`Unknown query string ${query}`);
}
