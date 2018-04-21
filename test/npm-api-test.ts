import * as npmapi from '../src/util/npm-api';
import * as test from 'tape';

const manifest = {
    versions: {
        '1.0.0': '',
        '1.0.1': '',
        '1.0.2': '',
        '1.0.3': '',
        '1.1.0': '',
        '1.2.0': '',
        '1.3.0-alpha': '',
        '1.3.0-beta': '',
        '1.3.0': '',
        '2.0.0': '',
    },
    time: {},
    'dist-tags': { latest: '2.0.0' },
};

const allVersions = [
    '1.0.0',
    '1.0.1',
    '1.0.2',
    '1.0.3',
    '1.1.0',
    '1.2.0',
    '1.3.0-alpha',
    '1.3.0-beta',
    '1.3.0',
    '2.0.0',
];

const manifestUnordered = {
    versions: {
        '1.3.0-alpha': '',
        '1.3.0-beta': '',
        '2.0.0': '',
        '1.0.1': '',
        '1.0.2': '',
        '1.3.0': '',
        '1.2.0': '',
        '1.1.0': '',
        '1.0.3': '',
        '1.0.0': '',
    },
    time: {},
    'dist-tags': { latest: '2.0.0' },
};

test('getAllVersions should return versions array', t => {
    t.plan(1);
    const actual = npmapi.getAllVersions(manifest);
    t.deepEqual(actual, allVersions);
});

test('getAllVersions should sort by semver', t => {
    t.plan(1);
    const actual = npmapi.getAllVersions(manifestUnordered);
    t.deepEqual(actual, allVersions);
});

test('getLatestVersion', t => {
    t.plan(1);
    const latest = npmapi.getLatestVersion(manifest);
    t.equal(latest, '2.0.0');
});

test('getVersionsForChart middle', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, '1.2.0', 2);
    t.deepEqual(actual, ['1.0.3', '1.1.0', '1.2.0', '1.3.0-alpha', '1.3.0-beta']);
});

test('getVersionsForChart first', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, '1.0.0', 2);
    t.deepEqual(actual, ['1.0.0', '1.0.1', '1.0.2', '1.0.3', '1.1.0']);
});

test('getVersionsForChart second', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, '1.0.1', 2);
    t.deepEqual(actual, ['1.0.0', '1.0.1', '1.0.2', '1.0.3', '1.1.0']);
});

test('getVersionsForChart last', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, '2.0.0', 2);
    t.deepEqual(actual, ['1.2.0', '1.3.0-alpha', '1.3.0-beta', '1.3.0', '2.0.0']);
});

test('getVersionsForChart second to last', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, '1.3.0', 2);
    t.deepEqual(actual, ['1.2.0', '1.3.0-alpha', '1.3.0-beta', '1.3.0', '2.0.0']);
});

test('getVersionsForChart with count larger than allVersions', t => {
    t.plan(1);
    const actual = npmapi.getVersionsForChart(allVersions, '1.3.0-beta', 30);
    t.deepEqual(actual, allVersions);
});
