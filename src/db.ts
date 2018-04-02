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

type HGETALL = { [key: string]: string };

export function getAll(pkg: string) {
    return new Promise<HGETALL>((resolve, reject) => {
        client.hgetall(pkg, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
}

export function set(pkg: string, version: string, installSize: number, publishSize: number) {
    return new Promise<number>((resolve, reject) => {
        const payload = { installSize, publishSize };
        const value = JSON.stringify(payload);
        client.hset(pkg, version, value, (err, reply) => {
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
client.hgetall('copee', (_, obj) => console.log(obj['1.0.0']));