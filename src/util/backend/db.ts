import Redis from 'ioredis';

const { REDIS_URL = '' } = process.env;
delete process.env.REDIS_URL;

if (!REDIS_URL) {
    throw new Error('Missing REDIS_URL environment variable');
}

try {
    new URL(REDIS_URL);
} catch (err) {
    throw new Error('Invalid REDIS_URL environment variable');
}

const client = new Redis(REDIS_URL);

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
                    const payload: PkgSize = JSON.parse(reply[version] || '{}');
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
