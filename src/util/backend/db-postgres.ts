import { sql } from '@vercel/postgres';
import type { PkgSize } from '../../types';

export async function findAll(name: string) {
    const { rows } = await sql`
        SELECT *
        FROM "packages"
        WHERE name = ${name};
    `;
    const obj: { [key: string]: PkgSize } = {};
    for (let row of rows) {
        const payload = row as PkgSize;
        obj[payload.version] = payload;
    }
    return obj;
}

export async function findOne(name: string, version: string) {
    const { rows } = await sql`
        SELECT *
        FROM "packages"
        WHERE name = ${name}
        AND version = ${version};
    `;

    const reply = rows[0];

    if (!reply) {
        return null;
    }

    return reply as PkgSize;
}

export async function insert(pkg: PkgSize) {
    const reply = await sql`
        INSERT INTO "packages" VALUES (${pkg.name}, ${pkg.version}, ${pkg.publishSize}, ${pkg.installSize}, ${pkg.publishFiles}, ${pkg.installFiles});
    `;
    return reply;
}
