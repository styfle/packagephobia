import React from 'react';
import { pages, versionUnknown } from '../util/constants';
import { getReadableFileSize } from '../util/npm-parser';
import PageContainer from '../components/PageContainer';
import BarGraph from '../components/BarGraph';
import Stats from '../components/Stats';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Image from '../components/Image';
import LinkedLogos from '../components/LinkedLogos';
import { getBadgeUrl, getBadgeMarkdown } from '../util/badge';

const error: React.CSSProperties = {
    fontSize: '2.3rem',
    color: '#D33',
    textAlign: 'center',
};

export default class ResultPage extends React.Component<ResultProps, {}> {
    render() {
        const { pkgSize, readings, isLatest } = this.props;
        const exists = pkgSize.version !== versionUnknown;
        const install = getReadableFileSize(pkgSize.installSize);
        const publish = getReadableFileSize(pkgSize.publishSize);
        const pkgNameAndVersion = isLatest ? pkgSize.name : `${pkgSize.name}@${pkgSize.version}`;
        const badgeUrl = getBadgeUrl(pkgSize, isLatest);

        return (
            <>
                <PageContainer>
                    <SearchBar autoFocus={false} defaultValue={pkgNameAndVersion} />
                    {exists ? (
                        <div style={{ display: 'flex', padding: '10px 0' }}>
                            <details style={{ cursor: 'pointer' }} title="Click to view markdown">
                                <summary>
                                    <img alt="badge" src={badgeUrl} />
                                </summary>
                                <p>
                                    Copy and paste the following into your README.md:
                                    <br />
                                    <input
                                        type="text"
                                        aria-label="Markdown for Badge"
                                        defaultValue={getBadgeMarkdown(pkgNameAndVersion)}
                                        style={{ width: '100%', fontFamily: 'monospace' }}
                                    />
                                </p>
                            </details>
                            <LinkedLogos pkgSize={pkgSize} isLatest={isLatest} />
                        </div>
                    ) : (
                        <p style={error}>A Tumbeast ate your package</p>
                    )}
                    {exists ? (
                        <div className="content-container">
                            <Stats publish={publish} install={install} />
                            <BarGraph readings={readings} getHref={getHref} />
                        </div>
                    ) : (
                        <Image width={350} height={350} file="tumblebeasts/tbstand2.png" />
                    )}
                </PageContainer>
                <Footer />
            </>
        );
    }
}

const getHref = (r: PkgSize) => `${pages.result}?p=${r.name}@${r.version}`;
