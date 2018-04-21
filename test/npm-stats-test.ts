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

test('getDirSize original file should equal hardlink file', t => {
    t.plan(1);
    const original = path
        .join(__dirname, 'a-hardlink', 'original.txt')
        .replace('/dist', '');

    const hardlink = path
        .join(__dirname, 'a-hardlink', 'hardlink.txt')
        .replace('/dist', '');

    const originalSize = npmstats.getDirSize(original);
    const hardlinkSize = npmstats.getDirSize(hardlink);

    t.equal(originalSize, hardlinkSize);
});

test('getDirSize should count hardlink once', t => {
    t.plan(1);
    const dir = path
        .join(__dirname, 'a-hardlink')
        .replace('/dist', '');

    const actual = npmstats.getDirSize(dir);
    
    t.equal(actual, 214);
});
/*
test('getDirSize full-icu should be 26 MB', t => {
    t.plan(1);
    const dir = path
        .join(__dirname, '../node_modules/full-icu')
        .replace('/dist', '');

    const actual = npmstats.getDirSize(dir);
    
    t.equal(actual, 26874753);
});
*/