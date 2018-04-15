import * as npmstats from '../src/util/backend/npm-stats';
import * as path from 'path';
import * as test from 'tape';

test('getDirSize top level', t => {
    t.plan(1);
    const dir = path.join(__dirname, 'a-directory').replace('/dist', '');
    const actual = npmstats.getDirSize(dir);
    t.equal(actual, 242);
});

test('getDirSize second level', t => {
    t.plan(1);
    const dir = path.join(__dirname, 'a-directory', 'a-nested-directory').replace('/dist', '');
    const actual = npmstats.getDirSize(dir);
    t.equal(actual, 120);
});

test('getDirSize single file', t => {
    t.plan(1);
    const dir = path
        .join(__dirname, 'a-directory', 'a-nested-directory', 'example4.txt')
        .replace('/dist', '');
    const actual = npmstats.getDirSize(dir);
    t.equal(actual, 77);
});
