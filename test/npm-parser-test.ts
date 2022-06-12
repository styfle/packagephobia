import * as npmparser from '../src/util/npm-parser';
import test from 'test';
import assert from 'assert/strict';

const kilobyte = 1024;
const megabyte = 1024 * 1024;

test('getHexColor B green', () => {
    const actual = npmparser.getHexColor(712);
    assert.equal(actual, npmparser.color.brightgreen);
});

test('getHexColor kB green', () => {
    const actual = npmparser.getHexColor(kilobyte * 3.14);
    assert.equal(actual, npmparser.color.brightgreen);
});

test('getHexColor 900 kB limegreen', () => {
    const actual = npmparser.getHexColor(kilobyte * 900);
    assert.equal(actual, npmparser.color.limegreen);
});

test('getHexColor 2 MB blue', () => {
    const actual = npmparser.getHexColor(megabyte * 2);
    assert.equal(actual, npmparser.color.blue);
});

test('getHexColor 10 MB yellow', () => {
    const actual = npmparser.getHexColor(megabyte * 10);
    assert.equal(actual, npmparser.color.yellow);
});

test('getHexColor 40 MB orange', () => {
    const actual = npmparser.getHexColor(megabyte * 40);
    assert.equal(actual, npmparser.color.orange);
});

test('getHexColor 80 MB red', () => {
    const actual = npmparser.getHexColor(megabyte * 80);
    assert.equal(actual, npmparser.color.orange);
});

test('getHexColor 120 MB red', () => {
    const actual = npmparser.getHexColor(megabyte * 120);
    assert.equal(actual, npmparser.color.red);
});

test('getHexColor 700 MB super red pink', () => {
    const actual = npmparser.getHexColor(megabyte * 700);
    assert.equal(actual, npmparser.color.pink);
});

test('getReadableFileSize 512 B', () => {
    const actual = npmparser.getReadableFileSize(512);
    assert.equal(actual.size, '512');
    assert.equal(actual.unit, 'B');
});

test('getReadableFileSize 3.14 kB', () => {
    const actual = npmparser.getReadableFileSize(kilobyte * 3.14);
    assert.equal(actual.size, '3.14');
    assert.equal(actual.unit, 'kB');
});

test('getReadableFileSize 1 MB', () => {
    const actual = npmparser.getReadableFileSize(megabyte);
    assert.equal(actual.size, '1.00');
    assert.equal(actual.unit, 'MB');
});

test('getReadableFileSize 10 MB', () => {
    const actual = npmparser.getReadableFileSize(megabyte * 16.3);
    assert.equal(actual.size, '16.3');
    assert.equal(actual.unit, 'MB');
});

test('getReadableFileSize 712 MB', () => {
    const actual = npmparser.getReadableFileSize(megabyte * 712.8);
    assert.equal(actual.size, '713');
    assert.equal(actual.unit, 'MB');
});

test('getReadableFileSize 5.86 GB', () => {
    const actual = npmparser.getReadableFileSize(megabyte * 6000);
    assert.equal(actual.size, '5.86');
    assert.equal(actual.unit, 'GB');
});

test('parsePackageString without scope and with version', () => {
    const actual = npmparser.parsePackageString('foo@1.2.3');
    assert.deepEqual(actual, { scoped: false, name: 'foo', version: '1.2.3' });
});

test('parsePackageString with scope and with version', () => {
    const actual = npmparser.parsePackageString('@types/foo@1.2.3');
    assert.deepEqual(actual, { scoped: true, name: '@types/foo', version: '1.2.3' });
});

test('parsePackageString without scope and without version', () => {
    const actual = npmparser.parsePackageString('foo');
    assert.deepEqual(actual, { scoped: false, name: 'foo', version: null });
});

test('parsePackageString with scope and without version', () => {
    const actual = npmparser.parsePackageString('@types/foo');
    assert.deepEqual(actual, { scoped: true, name: '@types/foo', version: null });
});

test('parsePackageString with leading space', () => {
    const actual = npmparser.parsePackageString(' @types/foo');
    assert.deepEqual(actual, { scoped: true, name: '@types/foo', version: null });
});

test('parsePackageString with trailing space', () => {
    const actual = npmparser.parsePackageString(' @types/foo ');
    assert.deepEqual(actual, { scoped: true, name: '@types/foo', version: null });
});

test('isFullRelease 1.2.3', () => {
    const actual = npmparser.isFullRelease('1.2.3');
    assert.equal(actual, true);
});

test('isFullRelease 10.0.39', () => {
    const actual = npmparser.isFullRelease('10.0.39');
    assert.equal(actual, true);
});

test('isFullRelease 2.9.0-dev.20180323', () => {
    const actual = npmparser.isFullRelease('2.9.0-dev.20180323');
    assert.equal(actual, false);
});

test('isFullRelease 2.0.0-alpha.1', () => {
    const actual = npmparser.isFullRelease('2.0.0-alpha.1');
    assert.equal(actual, false);
});
