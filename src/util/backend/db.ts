import * as redis from './db-redis'
import * as postgres from './db-postgres'
import type { PkgSize } from '../../types';

export async function findAll(name: string) {
    if (process.env.TRY_POSTGRES === '1') {
        return postgres.findAll(name);
    }
    return redis.findAll(name);
}

export async function findOne(name: string, version: string) {
    if (process.env.TRY_POSTGRES === '1') {
        return postgres.findOne(name, version);
    }
    return redis.findOne(name, version);
}

export async function insert(pkg: PkgSize) {
    if (process.env.TRY_POSTGRES === '1') {
        return postgres.insert(pkg);
    }
    return redis.insert(pkg);
}
