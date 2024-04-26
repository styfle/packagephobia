import * as npmapi from '../src/util/npm-api';
import test from 'node:test';
import assert from 'assert/strict';

const manifest = {
    name: 'manifest example',
    description: 'manifest example description',
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
    modified: '2019-01-01T16:01:12.408Z',
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
    name: 'manifest unordered example',
    description: 'manifest unordered example description',
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
    modified: '2019-01-01T16:01:12.408Z',
    'dist-tags': { latest: '2.0.0' },
};

test('getAllVersions should return versions array', () => {
    const actual = npmapi.getAllVersions(manifest);
    assert.deepEqual(actual, allVersions);
});

test('getAllVersions should sort by semver', () => {
    const actual = npmapi.getAllVersions(manifestUnordered);
    assert.deepEqual(actual, allVersions);
});

test('getLatestVersion', () => {
    const { latest } = npmapi.getAllDistTags(manifest);
    assert.equal(latest, '2.0.0');
});

test('getVersionsForChart middle', () => {
    const actual = npmapi.getVersionsForChart(allVersions, '1.2.0', 2);
    assert.deepEqual(actual, ['1.0.3', '1.1.0', '1.2.0', '1.3.0-alpha', '1.3.0-beta']);
});

test('getVersionsForChart first', () => {
    const actual = npmapi.getVersionsForChart(allVersions, '1.0.0', 2);
    assert.deepEqual(actual, ['1.0.0', '1.0.1', '1.0.2', '1.0.3', '1.1.0']);
});

test('getVersionsForChart second', () => {
    const actual = npmapi.getVersionsForChart(allVersions, '1.0.1', 2);
    assert.deepEqual(actual, ['1.0.0', '1.0.1', '1.0.2', '1.0.3', '1.1.0']);
});

test('getVersionsForChart last', () => {
    const actual = npmapi.getVersionsForChart(allVersions, '2.0.0', 2);
    assert.deepEqual(actual, ['1.2.0', '1.3.0-alpha', '1.3.0-beta', '1.3.0', '2.0.0']);
});

test('getVersionsForChart second to last', () => {
    const actual = npmapi.getVersionsForChart(allVersions, '1.3.0', 2);
    assert.deepEqual(actual, ['1.2.0', '1.3.0-alpha', '1.3.0-beta', '1.3.0', '2.0.0']);
});

test('getVersionsForChart with count larger than allVersions', () => {
    const actual = npmapi.getVersionsForChart(allVersions, '1.3.0-beta', 30);
    assert.deepEqual(actual, allVersions);
});
