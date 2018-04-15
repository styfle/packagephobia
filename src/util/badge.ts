import { getReadableFileSize, getHexColor } from './npm-parser';

export function getBadgeUrl(pkgSize: PkgSize) {
    const { installSize } = pkgSize;
    const { readable } = getReadableFileSize(installSize);
    const color = getHexColor(installSize);
    return `https://img.shields.io/badge/install%20size-${readable}-${color}.svg`;
}
