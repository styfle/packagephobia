import { badgen } from 'badgen';
import { getReadableFileSize, getHexColor, color } from './npm-parser';
import { pages, productionHostname } from '../util/constants';

export function getBadgeSvg(pkgSize: PkgSize) {
    const { installSize } = pkgSize;
    const { pretty } = getReadableFileSize(installSize);
    return badgen({
        label: 'install size',
        status: installSize ? pretty : 'package not found',
        color: installSize ? getHexColor(installSize) : color.red,
    });
}

export function getBadgeUrl(pkgSize: PkgSize, isLatest: boolean) {
    const { name, version } = pkgSize;
    const pkgNameAndVersion = isLatest ? name : `${name}@${version}`;
    return `https://${productionHostname}${pages.badge}?p=${pkgNameAndVersion}`;
}

export function getBadgeMarkdown(pkgNameAndVersion: string) {
    const badgePage = `https://${productionHostname}${pages.badge}?p=${pkgNameAndVersion}`;
    const resultPage = `https://${productionHostname}${pages.result}?p=${pkgNameAndVersion}`;
    return `[![install size](${badgePage})](${resultPage})`;
}

export function getApiResponseSize(bytes: number, files: number): ApiResponseSize {
    const { pretty } = getReadableFileSize(bytes);
    const color = '#' + getHexColor(bytes);
    return { bytes, files, pretty, color };
}
