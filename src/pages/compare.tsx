import React from 'react';
import { pages, versionUnknown } from '../util/constants';
import { getReadableFileSize } from '../util/npm-parser';
import PageContainer from '../components/PageContainer';
import Footer from '../components/Footer';
import { getBadgeUrl } from '../util/badge';
import { Stat } from '../components/Stats';
import SearchBar from '../components/SearchBar';
import Sponsors from '../components/Sponsors';
import type { CompareProps } from '../types';

export default ({ inputStr, results }: CompareProps) => {
    const resultsToPrint = results.map(({ pkgSize, isLatest }) => {
        const { name, version, installSize, publishSize } = pkgSize;
        const install = getReadableFileSize(installSize);
        const publish = getReadableFileSize(publishSize);
        const pkgNameAndVersion = isLatest ? name : `${name}@${version}`;
        const badgeUrl = getBadgeUrl(pkgSize, isLatest);
        return {
            name,
            version,
            install,
            publish,
            installSize,
            pkgNameAndVersion,
            badgeUrl,
        };
    });

    return (
        <>
            <PageContainer>
                <SearchBar autoFocus={false} defaultValue={inputStr} />
                <div style={{ maxWidth: '100%', overflow: 'auto' }}>
                    <table style={{ marginTop: '30px' }}>
                        <tbody>
                            {resultsToPrint
                                .filter(
                                    result => result.version && result.version !== versionUnknown,
                                )
                                .sort((a, b) => b.installSize - a.installSize)
                                .map(result => (
                                    <tr key={result.pkgNameAndVersion}>
                                        <td style={{ fontSize: '1.5rem', paddingRight: '2rem' }}>
                                            <a
                                                style={{ textDecoration: 'none' }}
                                                href={
                                                    pages.result + '?p=' + result.pkgNameAndVersion
                                                }
                                            >
                                                <Stat
                                                    size={result.name}
                                                    unit=""
                                                    label={result.version}
                                                    scale={0.75}
                                                    color="var(--brand-color)"
                                                    textAlign="right"
                                                />
                                            </a>
                                        </td>
                                        <td style={{ padding: '0 2rem', textAlign: 'center' }}>
                                            <Stat
                                                {...result.install}
                                                label="Install"
                                                scale={0.75}
                                            />
                                        </td>
                                        <td style={{ padding: '0 2rem', textAlign: 'center' }}>
                                            <Stat
                                                {...result.publish}
                                                label="Publish"
                                                scale={0.75}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <Sponsors />
            </PageContainer>
            <Footer />
        </>
    );
};
