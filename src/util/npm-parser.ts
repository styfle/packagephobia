export function parsePackageString(packageString: string): PackageVersion {
    let name: string;
    let version: string | null;
    let scoped = false;
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

const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function getReadableFileSize(bytes: number): SizeWithUnit {
    const exponent = Math.min(Math.floor(Math.log10(bytes) / 3), UNITS.length - 1);
    const size = (bytes / Math.pow(1024, exponent)).toPrecision(3);
    const unit = UNITS[exponent];
    return { size, unit, readable: `${size} ${unit}` };
}

const megabyte = 1024 * 1024;
const fiveMb = 5 * megabyte;
const thirtyMb = 30 * megabyte;
const oneHundredMb = 100 * megabyte;
const fiveHundred = 500 * megabyte;

export function getHexColor(bytes: number) {
    if (bytes < megabyte) {
        return '4bc524';
    } else if (bytes < fiveMb) {
        return '0472b4';
    } else if (bytes < thirtyMb) {
        return 'cba41b';
    } else if (bytes < oneHundredMb) {
        return 'e77335';
    } else if (bytes < fiveHundred) {
        return 'cb543e';
    } else {
        return 'ff0000';
    }
}
