import React from 'react';
import Image from '../components/Image';
import Footer from '../components/Footer';
import PageContainer from '../components/PageContainer';
import { pages } from '../util/constants';

export default () => (
    <>
        <PageContainer>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>400 Bad Request</h1>

                <p>Oops, your package.json file could not be parsed.</p>
                <p>
                    <a href={pages.index}>Go Home You</a>
                </p>
            </div>

            <Image width={370} height={299} file="tumblebeasts/tbstand1.png" />
        </PageContainer>

        <Footer />
    </>
);
