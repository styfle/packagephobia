import { getReadableFileSize, getHexColor } from './npm-parser';
import { pages, hostname } from '../util/constants';

export function getBadgeUrl(pkgSize: PkgSize, isLatest: boolean) {
    const { name, version } = pkgSize;
    return isLatest
        ? `https://badgen.net/packagephobia/install/${name}`
        : `https://badgen.net/packagephobia/install/${name}@${version}`;
}

export function getBadgeMarkdown(pkgNameAndVersion: string) {
    const badgePage = `https://${hostname}${pages.badge}?p=${pkgNameAndVersion}`;
    const resultPage = `https://${hostname}${pages.result}?p=${pkgNameAndVersion}`;
    return `[![install size](${badgePage})](${resultPage})`;
}

export function getApiResponseSize(bytes: number): ApiResponseSize {
    const { pretty } = getReadableFileSize(bytes);
    const color = '#' + getHexColor(bytes);
    return { bytes, pretty, color };
}
