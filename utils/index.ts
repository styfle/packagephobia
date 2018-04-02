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

export function getReadableFileSize(bytes: number): SizeWithUnit {
    let i = -1;
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        bytes = bytes / 1024;
        i++;
    } while (bytes > 1024);

    const size = Math.max(bytes, 0.1).toFixed(1);
    const unit = units[i];
    return { size, unit, readable: `${size} ${unit}` };
};