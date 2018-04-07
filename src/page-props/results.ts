import { parsePackageString } from '../parse-utils';
import { getAllVersions, getVersion, setVersion } from '../db';
import { getLatestVersion, getMostRecentVersions } from '../npm-api';
import { calculatePackageSize } from '../pkg-stats';

export async function getResultProps(query: ParsedUrlQuery, tmp: string) {
    if (query && typeof query.p === 'string') {
        let { name, version } = parsePackageString(query.p);
        if (!version) {
            version = await getLatestVersion(name);
            console.log('no version found, using ' + version);
        }

        let existing = await getVersion(name, version);
        if (!existing) {
            console.log('no existing found...calculating')
            existing = await calculatePackageSize(name, version, tmp);
            setVersion(existing);
        }

        const mostRecentVersions = await getMostRecentVersions(name, 10);
        const cachedVersions = await getAllVersions(name);

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
        })
        const result: ResultProps = { pkgSize: existing, readings };
        return result;
    }
    throw new Error('unknown query string');
}