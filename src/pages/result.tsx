import React from 'react';

import PageContainer from '../components/PageContainer';
import BarGraph from '../components/BarGraph';
import Stats from '../components/Stats';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Image from '../components/Image';
import LinkedLogos from '../components/LinkedLogos';
import EthicalAd from '../components/EthicalAd';

import { pages, versionUnknown } from '../util/constants';
import { getReadableFileSize } from '../util/npm-parser';
import { getBadgeSvg, getBadgeMarkdown } from '../util/badge';

const error: React.CSSProperties = {
    fontSize: '2.3rem',
    color: '#D33',
    textAlign: 'center',
};

export default ({ pkgSize, readings, isLatest }: ResultProps) => {
    const exists = pkgSize.version !== versionUnknown;
    const install = getReadableFileSize(pkgSize.installSize);
    const publish = getReadableFileSize(pkgSize.publishSize);
    const pkgNameAndVersion = isLatest ? pkgSize.name : `${pkgSize.name}@${pkgSize.version}`;
    const badgeSvg = getBadgeSvg(pkgSize);

    return (
        <>
            <PageContainer>
                <SearchBar autoFocus={false} defaultValue={pkgNameAndVersion} />

                {exists ? (
                    <div style={{ display: 'flex', padding: '10px 0' }}>
                        <details style={{ cursor: 'pointer' }} title="Click to view markdown">
                            <summary dangerouslySetInnerHTML={{ __html: badgeSvg }} />
                            <p style={{ maxWidth: '138px' }}>
                                Markdown:
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
                <EthicalAd />
            </PageContainer>

            <Footer />
        </>
    );
};

const getHref = (r: PkgSize) => `${pages.result}?p=${r.name}@${r.version}`;
