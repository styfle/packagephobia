import { getReadableFileSize, getHexColor } from './npm-parser';

export function getBadgeUrl(pkgSize: PkgSize) {
    const { installSize } = pkgSize;
    const { pretty: readable } = getReadableFileSize(installSize);
    const color = getHexColor(installSize);
    return `https://badgen.now.sh/badge/install%20size/${readable}/${color}`;
}

export function getApiResponseSize(bytes: number): ApiResponseSize {
    const { pretty } = getReadableFileSize(bytes);
    const color = '#' + getHexColor(bytes);
    return { bytes, pretty, color };
}
