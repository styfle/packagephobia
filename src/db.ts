import { createClient } from 'redis';

const { REDIS_HOST = '127.0.0.1', REDIS_PORT = '14555', REDIS_PASS } = process.env;

const client = createClient({
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT),
    password: REDIS_PASS,
});

client.on('error', err => {
    console.error('Redis error: ', err);
});

export function findAll(name: string) {
    return new Promise<{ [key: string]: PkgSize }>((resolve, reject) => {
        client.hgetall(name, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                const obj: { [key: string]: PkgSize } = {};
                for (let version in reply) {
                    const payload: PkgSize = JSON.parse(reply[version]);
                    payload.name = name;
                    payload.version = version;
                    obj[version] = payload;
                }
                resolve(obj);
            }
        });
    });
}

export function findOne(name: string, version: string) {
    return new Promise<PkgSize | null>((resolve, reject) => {
        client.hget(name, version, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                if (!reply) {
                    resolve(null);
                } else {
                    let record: PkgSize = JSON.parse(reply);
                    record.name = name;
                    record.version = version;
                    resolve(record);
                }
            }
        });
    });
}

export function insert(data: PkgSize) {
    return new Promise<number>((resolve, reject) => {
        const { name, version, ...payload } = data;
        const value = JSON.stringify(payload);
        client.hset(name, version, value, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
}
