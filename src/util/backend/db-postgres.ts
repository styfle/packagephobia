import { sql } from '@vercel/postgres';
import type { PkgSize } from '../../types';

export async function findAll(name: string) {
    console.time('findAll (postgres)');
    const { rows } = await sql`
        SELECT *
        FROM "packages"
        WHERE name = ${name};
    `;
    console.timeEnd('findAll (postgres)');
    const obj: { [key: string]: PkgSize } = {};
    for (let row of rows) {
        const payload = row as PkgSize;
        obj[payload.version] = payload;
    }
    return obj;
}

export async function findOne(name: string, version: string) {
    console.time('findOne (postgres)');
    const { rows } = await sql`
        SELECT *
        FROM "packages"
        WHERE name = ${name}
        AND version = ${version};
    `;
    console.timeEnd('findOne (postgres)');
    const reply = rows[0];

    if (!reply) {
        return null;
    }

    return reply as PkgSize;
}

export async function insert({
    name,
    version,
    publishSize,
    installSize,
    publishFiles,
    installFiles,
}: PkgSize) {
    console.time('insert (postgres)');
    const reply = await sql`
        INSERT INTO "packages" 
        VALUES (${name}, ${version}, ${publishSize}, ${installSize}, ${publishFiles}, ${installFiles})
        ON CONFLICT ("name", "version")
        DO UPDATE SET "publishSize" = ${publishSize}, "installSize" = ${installSize}, "publishFiles" = ${publishFiles}, "installFiles" = ${installFiles}
        ;
    `;
    console.timeEnd('insert (postgres)');
    return reply;
}
