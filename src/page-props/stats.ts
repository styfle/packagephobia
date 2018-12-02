import { scan, hlen } from '../util/backend/db';

export async function getStatsProps(query: ParsedUrlQuery) {
    let start = '0';
    if (query && typeof query.start === 'string') {
        start = query.start;
    }

    const allRows = await scanRecursive(start, []);
    const packageCount = allRows.length;
    let packageVersionCount = 0;
    for (let row of allRows) {
        const length = await hlen(row);
        packageVersionCount += length;
        if (packageVersionCount % 1000 === 0)
            console.log(`${new Date().toISOString()} ${packageVersionCount} ${row}:${length}`);
    }
    const props: StatsProps = { packageCount, packageVersionCount };
    return props;
}

async function scanRecursive(start: string, allRows: string[]) {
    const [next, rows] = await scan(start);
    rows.forEach(r => allRows.push(r));
    if (next !== '0') {
        await scanRecursive(next, allRows);
    }
    return allRows;
}
