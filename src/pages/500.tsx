import React from 'react';

import Image from '../components/Image';
import Footer from '../components/Footer';
import PageContainer from '../components/PageContainer';

import { pages } from '../util/constants';

export default () => (
    <>
        <PageContainer>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>Unable to locate package package</h1>

                <p>We could not find the package you are looking for. Please, search again!</p>
                <p>
                    <a href={pages.index}>Go Home You</a>
                </p>
            </div>

            <Image width={500} height={320} file="tumblebeasts/tbservers.png" />
        </PageContainer>

        <Footer />
    </>
);
