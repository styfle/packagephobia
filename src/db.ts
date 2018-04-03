import { createClient } from 'redis';

const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = process.env;

const client = createClient({
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT || 'no-port', 10),
    password: REDIS_PASS,
});

client.on('error', (err) => {
    console.error('Redis error: ', err);
});

export function getAllVersions(name: string) {
    return new Promise<{[key: string]: PkgSize}>((resolve, reject) => {
        client.hgetall(name, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                const obj: {[key: string]: PkgSize} = {};
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

export function getVersion(name: string, version: string) {
    return new Promise<PkgSize | null>((resolve, reject) => {
        client.hget(name, version, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                const record: PkgSize | null = reply ? JSON.parse(reply) : null;
                resolve(record);
            }
        });
    });
}

export function setVersion(data: PkgSize) {
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

//client.hset('copee', '1.0.0', 42, console.log);
//client.hset('copee', '1.0.1', 43, console.log);
//client.hset('copee', '1.0.2', 47, console.log);
//client.hget('copee', '1.0.0', console.log);
//client.hkeys('copee', console.log);
//client.hvals('copee', console.log);
//client.hgetall('copee', (_, obj) => console.log(obj['1.0.0']));