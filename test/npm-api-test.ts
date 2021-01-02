import * as npmapi from '../src/util/npm-api';
import test from 'tape';

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
    time: {
        modified: '2019-01-01T16:01:12.408Z',
        created: '2015-07-23T06:26:33.784Z',
        '1.0.0': '2017-10-14T22:05:10.599Z',
        '1.0.1': '2017-11-13T00:19:38.495Z',
        '1.0.2': '2017-12-02T02:56:22.595Z',
        '1.0.3': '2017-12-12T15:38:31.824Z',
        '1.1.0': '2018-03-12T00:02:12.562Z',
        '1.2.0': '2018-04-03T00:18:23.503Z',
        '1.3.0-alpha': '2018-04-04T00:11:19.000Z',
        '1.3.0-beta': '2018-05-05T00:21:45.000Z',
        '1.3.0': '2018-07-06T00:19:51.000Z',
        '2.0.0': '2018-07-11T00:24:16.000Z',
    },
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
    const { latest } = npmapi.getAllDistTags(manifest);
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

test('getPublishDate should get date for specific version', t => {
    t.plan(1);
    const actual = npmapi.getPublishDate(manifest, '1.0.0');
    t.deepEqual(actual, '2017-10-14T22:05:10.599Z');
});

test('getPublishDate should return empty string for null manifest', t => {
    t.plan(1);
    const actual = npmapi.getPublishDate(null, '1.0.0');
    t.deepEqual(actual, '');
});
