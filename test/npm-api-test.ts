import * as npmapi from '../src/util/npm-api';
import * as test from 'tape';

const manifest = {
    versions: {
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: '',
        seven: '',
        eight: '',
        nine: '',
        ten: '',
    },
    time: {},
    'dist-tags': { latest: 'ten' },
};

const allVersions = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

test('getAllVersions', t => {
    t.plan(1);
    const actual = npmapi.getAllVersions(manifest);
    const expected = allVersions;
    t.deepEqual(actual, expected);
});

test('getLatestVersion', t => {
    t.plan(1);
    const latest = npmapi.getLatestVersion(manifest);
    t.equal(latest, 'ten');
});

test('getVersionsForChart middle', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, 'six', 2);
    t.deepEqual(actual, ['four', 'five', 'six', 'seven', 'eight']);
});

test('getVersionsForChart first', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, 'one', 2);
    t.deepEqual(actual, ['one', 'two', 'three', 'four', 'five']);
});

test('getVersionsForChart second', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, 'two', 2);
    t.deepEqual(actual, ['one', 'two', 'three', 'four', 'five']);
});

test('getVersionsForChart last', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, 'ten', 2);
    t.deepEqual(actual, ['six', 'seven', 'eight', 'nine', 'ten']);
});

test('getVersionsForChart second to last', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, 'nine', 2);
    t.deepEqual(actual, ['six', 'seven', 'eight', 'nine', 'ten']);
});

test('getVersionsForChart with count larger than allVersions', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, 'eight', 30);
    t.deepEqual(actual, allVersions);
});
