import React from 'react';

import Image from '../components/Image';
import Footer from '../components/Footer';
import PageContainer from '../components/PageContainer';

import { pages } from '../util/constants';

export default ({ reqId }: { reqId: string }) => (
    <>
        <PageContainer>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>500 Internal Server Error</h1>

                <p>Oops, the package failed to install.</p>
                <p style={{ maxWidth: '500px' }}>
                    This can happen when there is no prebuilt binary for node@
                    {process.versions.node} or the install script requires CLIs like
                    python/curl/etc.
                </p>
                <p>
                    <a href={pages.index}>Go Home</a>
                </p>
                <p>
                    <a
                        rel="nofollow"
                        href={`https://vercel.com/packagephobia/packagephobia/logs?requestIds=${reqId}`}
                    >
                        View Logs
                    </a>
                </p>
            </div>

            <Image width={500} height={320} file="tumblebeasts/tbservers.png" />
        </PageContainer>

        <Footer />
    </>
);
