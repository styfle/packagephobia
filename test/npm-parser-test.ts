import * as npmparser from '../src/util/npm-parser';
import test from 'tape';

const kilobyte = 1024;
const megabyte = 1024 * 1024;

test('getHexColor B green', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(712);
    t.equal(actual, npmparser.color.brightgreen);
});

test('getHexColor kB green', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(kilobyte * 3.14);
    t.equal(actual, npmparser.color.brightgreen);
});

test('getHexColor 900 kB limegreen', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(kilobyte * 900);
    t.equal(actual, npmparser.color.limegreen);
});

test('getHexColor 2 MB blue', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 2);
    t.equal(actual, npmparser.color.blue);
});

test('getHexColor 10 MB yellow', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 10);
    t.equal(actual, npmparser.color.yellow);
});

test('getHexColor 40 MB orange', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 40);
    t.equal(actual, npmparser.color.orange);
});

test('getHexColor 80 MB red', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 80);
    t.equal(actual, npmparser.color.orange);
});

test('getHexColor 120 MB red', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 120);
    t.equal(actual, npmparser.color.red);
});

test('getHexColor 700 MB super red pink', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 700);
    t.equal(actual, npmparser.color.pink);
});

test('getReadableFileSize 512 B', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(512);
    t.equal(actual.size, '512');
    t.equal(actual.unit, 'B');
});

test('getReadableFileSize 3.14 kB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(kilobyte * 3.14);
    t.equal(actual.size, '3.14');
    t.equal(actual.unit, 'kB');
});

test('getReadableFileSize 1 MB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(megabyte);
    t.equal(actual.size, '1.00');
    t.equal(actual.unit, 'MB');
});

test('getReadableFileSize 10 MB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(megabyte * 16.3);
    t.equal(actual.size, '16.3');
    t.equal(actual.unit, 'MB');
});

test('getReadableFileSize 712 MB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(megabyte * 712.8);
    t.equal(actual.size, '713');
    t.equal(actual.unit, 'MB');
});

test('getReadableFileSize 5.86 GB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(megabyte * 6000);
    t.equal(actual.size, '5.86');
    t.equal(actual.unit, 'GB');
});

test('parsePackageString without scope and with version', t => {
    t.plan(1);
    const actual = npmparser.parsePackageString('foo@1.2.3');
    t.deepEqual(actual, { scoped: false, name: 'foo', version: '1.2.3' });
});

test('parsePackageString with scope and with version', t => {
    t.plan(1);
    const actual = npmparser.parsePackageString('@types/foo@1.2.3');
    t.deepEqual(actual, { scoped: true, name: '@types/foo', version: '1.2.3' });
});

test('parsePackageString without scope and without version', t => {
    t.plan(1);
    const actual = npmparser.parsePackageString('foo');
    t.deepEqual(actual, { scoped: false, name: 'foo', version: null });
});

test('parsePackageString with scope and without version', t => {
    t.plan(1);
    const actual = npmparser.parsePackageString('@types/foo');
    t.deepEqual(actual, { scoped: true, name: '@types/foo', version: null });
});

test('parsePackageString with leading space', t => {
    t.plan(1);
    const actual = npmparser.parsePackageString(' @types/foo');
    t.deepEqual(actual, { scoped: true, name: '@types/foo', version: null });
});

test('parsePackageString with trailing space', t => {
    t.plan(1);
    const actual = npmparser.parsePackageString(' @types/foo ');
    t.deepEqual(actual, { scoped: true, name: '@types/foo', version: null });
});

test('isFullRelease 1.2.3', t => {
    t.plan(1);
    const actual = npmparser.isFullRelease('1.2.3');
    t.equal(actual, true);
});

test('isFullRelease 10.0.39', t => {
    t.plan(1);
    const actual = npmparser.isFullRelease('10.0.39');
    t.equal(actual, true);
});

test('isFullRelease 2.9.0-dev.20180323', t => {
    t.plan(1);
    const actual = npmparser.isFullRelease('2.9.0-dev.20180323');
    t.equal(actual, false);
});

test('isFullRelease 2.0.0-alpha.1', t => {
    t.plan(1);
    const actual = npmparser.isFullRelease('2.0.0-alpha.1');
    t.equal(actual, false);
});
