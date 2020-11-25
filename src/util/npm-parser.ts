export function parsePackageString(packageString: string): PackageVersion {
    let name: string;
    let version: string | null;
    let scoped = false;
    packageString = packageString.trim();
    const lastAtIndex = packageString.lastIndexOf('@');

    if (packageString.startsWith('@')) {
        scoped = true;
        if (lastAtIndex === 0) {
            name = packageString;
            version = null;
        } else {
            packageString.slice(0, lastAtIndex);
            name = packageString.substring(0, lastAtIndex);
            version = packageString.substring(lastAtIndex + 1);
        }
    } else {
        if (lastAtIndex === -1) {
            name = packageString;
            version = null;
        } else {
            name = packageString.substring(0, lastAtIndex);
            version = packageString.substring(lastAtIndex + 1);
        }
    }

    return { name, version, scoped };
}

const semver = /^\d+\.\d+.\d+$/;

export function isFullRelease(version: string): boolean {
    return semver.test(version);
}

const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const KB = 1024;

export function getReadableFileSize(bytes: number): SizeWithUnit {
    const exponent = Math.min(Math.floor(Math.log10(bytes) / 3), UNITS.length - 1);
    const size = (bytes / Math.pow(KB, exponent)).toPrecision(3);
    const unit = UNITS[exponent] || 'WAT';
    return { size, unit, pretty: `${size} ${unit}` };
}

const oneHundredKb = 100 * KB;
const megabyte = 1024 * KB;
const fiveMb = 5 * megabyte;
const thirtyMb = 30 * megabyte;
const oneHundredMb = 100 * megabyte;
const fiveHundredMb = 500 * megabyte;

/**
 * Some colors are defined here:
 * https://github.com/badges/shields/blob/master/lib/colorscheme.json
 * https://github.com/amio/badgen/blob/master/lib/color-presets.js
 */
export const color = {
    brightgreen: '44CC11',
    limegreen: '97CA00',
    yellow: 'DFB317',
    //yellowgreen: 'A4A61D',
    orange: 'FE7D37',
    red: 'E05D44',
    blue: '007EC6',
    //gray: '555555',
    //lightgray: '9F9F9F',
    pink: 'FF69B4',
};

export function getHexColor(bytes: number) {
    if (bytes < oneHundredKb) {
        return color.brightgreen;
    } else if (bytes < megabyte) {
        return color.limegreen;
    } else if (bytes < fiveMb) {
        return color.blue;
    } else if (bytes < thirtyMb) {
        return color.yellow;
    } else if (bytes < oneHundredMb) {
        return color.orange;
    } else if (bytes < fiveHundredMb) {
        return color.red;
    } else {
        return color.pink;
    }
}
