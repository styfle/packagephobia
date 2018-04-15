import * as npmparser from '../src/util/npm-parser';
import * as test from 'tape';

const megabyte = 1024 * 1024;

test('getHexColor 1 MB green', t => {
    t.plan(1);
    const actual = npmparser.getHexColor(megabyte * 1);
    t.equal(actual, '4bc524');
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

/* TODO: fix me
test('getReadableFileSize 512 kB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(512);
    t.equal(actual.size, '512.0');
    t.equal(actual.unit, 'B');
});

test('getReadableFileSize 1 MB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(megabyte);
    t.equal(actual.size, '1.0');
    t.equal(actual.unit, 'MB');
});

*/

test('getReadableFileSize 10 MB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(megabyte * 10);
    t.equal(actual.size, '10.0');
    t.equal(actual.unit, 'MB');
});

test('getReadableFileSize 712 MB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(megabyte * 712);
    t.equal(actual.size, '712.0');
    t.equal(actual.unit, 'MB');
});

test('getReadableFileSize 5.9 GB', t => {
    t.plan(2);
    const actual = npmparser.getReadableFileSize(megabyte * 6000);
    t.equal(actual.size, '5.9');
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
