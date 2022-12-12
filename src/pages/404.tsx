import React from 'react';

import Image from '../components/Image';
import Footer from '../components/Footer';
import PageContainer from '../components/PageContainer';

import { pages } from '../util/constants';

export default (props: { resource: string }) => (
    <>
        <PageContainer>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>404 Not Found</h1>

                <p>Oops, "{props.resource}" does not exist.</p>
                <p>
                    <a href={pages.index}>Go Home You</a>
                </p>
            </div>

            <Image width={300} height={380} file="tumblebeasts/tb_sign1.png" />
        </PageContainer>

        <Footer />
    </>
);
