import { sql } from '@vercel/postgres';
import { findAll } from '../src/util/backend/db-redis';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
    // This is a temporary function we can use to test
    if (process.env.VERCEL_ENV !== 'development') {
        res.statusCode = 403;
        res.end('403 Forbidden');
        return;
    }

    /*
console.log(await sql`
    CREATE COLLATION semver (
        LOCALE = 'en-US-u-kn-true',
        PROVIDER = 'icu'
    );
`);
*/

    console.log(
        await sql`
    drop table if exists "packages";
`,
    );
    console.log(
        await sql`
    CREATE TABLE "packages" (
        "name" VARCHAR(214),
        "version" VARCHAR(255) COLLATE semver,
        "publishSize" INTEGER,
        "installSize" INTEGER,
        "publishFiles" INTEGER,
        "installFiles" INTEGER,
        PRIMARY KEY ("name", "version")
    );
`,
    );

    const result = await findAll('next');
    console.log(`inserting ${Object.keys(result).length} rows`);

    for (let pkg of Object.values(result)) {
        await sql`
        INSERT INTO "packages" values (${pkg.name}, ${pkg.version}, ${pkg.publishSize}, ${pkg.installSize}, ${pkg.publishFiles}, ${pkg.installFiles});
    `;
    }
    /*
  console.log(await sql`
    SELECT *
    FROM "packages"
    ORDER BY version desc;
  `);
  */

    res.end('success');
}

/**
 CREATE COLLATION en_natural (
  LOCALE = 'en-US-u-kn-true',
  PROVIDER = 'icu'
);

CREATE TABLE test (
  version varchar(20) collate en_natural
);

INSERT INTO test values
  ('14.1.0'),
  ('14.20.0'),
  ('14.11.0'),
  ('14.10.0'),
  ('14.2.0'),
  ('14.0.2'),
  ('14.0.3-canary.1'),
  ('14.0.3-canary.0'),
  ('14.0.3-canary.9'),
  ('14.0.3-canary.10'),
  ('14.0.3-canary.11'),
  ('14.0.3-canary.12'),
  ('14.0.3');

SELECT split_part(version, '-', 1) as one, NULLIF(split_part(version, '-', 2), '') as two
FROM test
ORDER BY split_part(version, '-', 1) desc, NULLIF(split_part(version, '-', 2), '') desc;
 
 */
