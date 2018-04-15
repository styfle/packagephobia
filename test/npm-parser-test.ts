import * as npmparser from '../src/util/npm-parser';
import * as test from 'tape';

const kilobyte = 1024;
const megabyte = 1024 * 1024;

test('getHexColor B green', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(712);
    t.equal(actual, '4bc524');
});

test('getHexColor kB green', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(kilobyte * 3.14);
    t.equal(actual, '4bc524');
});

test('getHexColor 2 MB blue', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 2);
    t.equal(actual, '0472b4');
});

test('getHexColor 10 MB yellow', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 10);
    t.equal(actual, 'cba41b');
});

test('getHexColor 50 MB orange', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 50);
    t.equal(actual, 'e77335');
});

test('getHexColor 80 MB red', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 80);
    t.equal(actual, 'e77335');
});

test('getHexColor 700 MB super red', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 700);
    t.equal(actual, 'ff0000');
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
