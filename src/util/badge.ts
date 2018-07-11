import { getReadableFileSize, getHexColor } from './npm-parser';

export function getBadgeUrl(pkgSize: PkgSize) {
    const { installSize } = pkgSize;
    const { readable } = getReadableFileSize(installSize);
    const color = getHexColor(installSize);
    return `https://badgen.now.sh/badge/install%20size/${readable}/${color}.svg`;
}
