import { getDirSize } from '../src/util/backend/npm-stats';
import { join } from 'path';
import test from 'test';
import assert from 'assert/strict';

test('getDirSize top level', () => {
    const dir = join(__dirname, 'a-directory').replace('/dist', '');
    const files = new Set<number>();
    const size = getDirSize(dir, files);
    assert.equal(size, 242);
    assert.equal(files.size, 6);
});

test('getDirSize second level', () => {
    const dir = join(__dirname, 'a-directory', 'a-nested-directory').replace('/dist', '');
    const files = new Set<number>();
    const size = getDirSize(dir, files);
    assert.equal(size, 120);
    assert.equal(files.size, 3);
});

test('getDirSize single file', () => {
    const dir = join(__dirname, 'a-directory', 'a-nested-directory', 'example4.txt').replace(
        '/dist',
        '',
    );
    const files = new Set<number>();
    const size = getDirSize(dir, files);
    assert.equal(size, 77);
    assert.equal(files.size, 1);
});

test('getDirSize original file should equal hardlink file', () => {
    const original = join(__dirname, 'hardlink', 'orig.txt').replace('/dist', '');
    const hardlink = join(__dirname, 'hardlink', 'link').replace('/dist', '');

    const originalFiles = new Set<number>();
    const originalSize = getDirSize(original, originalFiles);
    const hardlinkFiles = new Set<number>();
    const hardlinkSize = getDirSize(hardlink, hardlinkFiles);

    assert.equal(originalSize, hardlinkSize);
    assert.equal(originalFiles.size, hardlinkFiles.size);
});

test('getDirSize should count hardlink once', () => {
    // ln test/original.txt test/hardlink.txt
    const dir = join(__dirname, 'hardlink').replace('/dist', '');

    const files = new Set<number>();
    const size = getDirSize(dir, files);

    assert.equal(size, 214);
    assert.equal(files.size, 2);
});
/*
test('getDirSize full-icu should be 26 MB', () => {
    // npm install --save full-icu@1.2.1
    t.plan(1);
    const dir = path
        .join(__dirname, '../node_modules/full-icu')
        .replace('/dist', '');

    const actual = getDirSize(dir);
    
    assert.equal(actual, 26874753);
});
*/
