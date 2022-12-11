import React from 'react';

import Footer from '../components/Footer';
import PageContainer from '../components/PageContainer';

import { pages } from '../util/constants';

export default () => (
    <>
        <PageContainer>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>Package Not Found</h1>

                <p>The package doesn't exist</p>
                <p>
                    <a href={pages.index}>Go Home You</a>
                </p>
            </div>
        </PageContainer>

        <Footer />
    </>
);
