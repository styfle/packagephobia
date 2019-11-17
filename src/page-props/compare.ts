import { parsePackageString } from '../util/npm-parser';
import { getPkgDetails } from './common';

export async function getCompareProps(query: ParsedUrlQuery, tmpDir: string) {
    if (!query || typeof query.p !== 'string') {
        throw new Error(`Unknown query string ${query}`);
    }
    const packages = query.p.split(',').map(parsePackageString);
    const force = query.force === '1';

    const promises = packages.map(({ name, version }) =>
        getPkgDetails(name, version, force, tmpDir),
    );
    const results = await Promise.all(promises);

    return { results };
}
