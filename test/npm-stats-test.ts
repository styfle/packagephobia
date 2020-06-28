import { getDirSize } from '../src/util/backend/npm-stats';
import { join } from 'path';
import test from 'tape';

test('getDirSize top level', t => {
    t.plan(2);
    const dir = join(__dirname, 'a-directory').replace('/dist', '');
    const files = new Set<number>();
    const size = getDirSize(dir, files);
    t.equal(size, 242);
    t.equal(files.size, 6);
});

test('getDirSize second level', t => {
    t.plan(2);
    const dir = join(__dirname, 'a-directory', 'a-nested-directory').replace('/dist', '');
    const files = new Set<number>();
    const size = getDirSize(dir, files);
    t.equal(size, 120);
    t.equal(files.size, 3);
});

test('getDirSize single file', t => {
    t.plan(2);
    const dir = join(__dirname, 'a-directory', 'a-nested-directory', 'example4.txt').replace(
        '/dist',
        '',
    );
    const files = new Set<number>();
    const size = getDirSize(dir, files);
    t.equal(size, 77);
    t.equal(files.size, 1);
});

test('getDirSize original file should equal hardlink file', t => {
    t.plan(2);
    const original = join(__dirname, 'hardlink', 'orig.txt').replace('/dist', '');
    const hardlink = join(__dirname, 'hardlink', 'link').replace('/dist', '');

    const originalFiles = new Set<number>();
    const originalSize = getDirSize(original, originalFiles);
    const hardlinkFiles = new Set<number>();
    const hardlinkSize = getDirSize(hardlink, hardlinkFiles);

    t.equal(originalSize, hardlinkSize);
    t.equal(originalFiles.size, hardlinkFiles.size);
});

test('getDirSize should count hardlink once', t => {
    // ln test/original.txt test/hardlink.txt
    t.plan(2);
    const dir = join(__dirname, 'hardlink').replace('/dist', '');

    const files = new Set<number>();
    const size = getDirSize(dir, files);

    t.equal(size, 214);
    t.equal(files.size, 2);
});
/*
test('getDirSize full-icu should be 26 MB', t => {
    // npm install --save full-icu@1.2.1
    t.plan(1);
    const dir = path
        .join(__dirname, '../node_modules/full-icu')
        .replace('/dist', '');

    const actual = getDirSize(dir);
    
    t.equal(actual, 26874753);
});
*/
