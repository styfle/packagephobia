import React from 'react';
import Image from '../components/Image';
import Footer from '../components/Footer';
import { pages } from '../util/constants';

const style: React.CSSProperties = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

export default () => (
    <>
        <div style={style}>
            <h1>404 Not Found</h1>
            <p>Oops, this page does not exist.</p>
            <p>
                <a href={pages.index}>Go Home You</a>
            </p>
            <Image width={300} height={380} file="tumblebeasts/tb_sign1.png" />
        </div>
        <Footer />
    </>
);
