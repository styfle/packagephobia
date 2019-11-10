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
            <h1>Failed to parse package.json</h1>
            <p>Oops, the package.json you uploaded could not be parsed. Be sure you uploaded the right file.</p>
            <p>
                <a href={pages.index}>Go Home</a>
            </p>
        </div>
        <Image width={300} height={380} file="/tumblebeasts/tbstand1.png" />
        <Footer />
    </>
);
