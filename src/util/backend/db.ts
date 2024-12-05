import * as redis from './db-redis';
import type { PkgSize } from '../../types';

export async function findAll(name: string) {
    return redis.findAll(name);
}

export async function findOne(name: string, version: string) {
    return redis.findOne(name, version);
}

export async function insert(pkg: PkgSize) {
    return redis.insert(pkg);
}
