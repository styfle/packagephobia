import React from 'react';
import { versionUnknown } from '../util/constants';
import { getReadableFileSize } from '../util/npm-parser';
import PageContainer from '../components/PageContainer';
import Footer from '../components/Footer';
import { getBadgeUrl } from '../util/badge';
import { Stat } from '../components/Stats';
import SearchBar from '../components/SearchBar';

export default class ComparePage extends React.Component<CompareProps, {}> {
    render() {
        const { results } = this.props;

        const resultsToPrint = results.map(({ pkgSize, isLatest }) => {
            const { name, version, installSize, publishSize } = pkgSize;
            const exists = version !== versionUnknown;
            const install = getReadableFileSize(installSize);
            const publish = getReadableFileSize(publishSize);
            const pkgNameAndVersion = isLatest ? name : `${name}@${version}`;
            const badgeUrl = getBadgeUrl(pkgSize, isLatest);
            return {
                exists,
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
                    <SearchBar
                        autoFocus={false}
                        defaultValue={resultsToPrint
                            .map(result => result.pkgNameAndVersion)
                            .join(',')}
                    />
                    <div style={{ maxWidth: '100%', overflow: 'auto' }}>
                        <table style={{ marginTop: '60px' }}>
                            <tbody>
                                {resultsToPrint
                                    .sort((a, b) => b.installSize - a.installSize)
                                    .filter(result => result.exists)
                                    .map((result, i) => (
                                        <tr key={i}>
                                            <td style={{ fontSize: '1.2em', paddingRight: '2em' }}>
                                                {result.pkgNameAndVersion}
                                            </td>
                                            <td style={{ padding: '0 2em', textAlign: 'center' }}>
                                                <Stat
                                                    {...result.install}
                                                    label="Install"
                                                    scale={0.75}
                                                />
                                            </td>
                                            <td style={{ padding: '0 2em', textAlign: 'center' }}>
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
                </PageContainer>
                <Footer />
            </>
        );
    }
}
