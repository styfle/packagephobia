import * as React from 'react';
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
            <h1>500 Internal Server Error</h1>
            <p>Oops, something went terribly wrong.</p>
            <p>
                <a href={pages.index}>Go Home You</a>
            </p>
            <Image width={500} height={320} file="tumblebeasts/tbservers.png" />
        </div>
        <Footer />
    </>
);
