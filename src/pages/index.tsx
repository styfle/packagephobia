import * as React from 'react';
import PageContainer from '../components/PageContainer';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import { pages } from '../util/constants';

const h1: React.CSSProperties = {
    letterSpacing: '4px',
    fontSize: '1.7rem',
    textTransform: 'uppercase',
    marginBottom: '0',
};

export default () => (
    <>
        <PageContainer>
            <img src={pages.logo} width="108px" height="108px" />

            <h1 style={h1}>
                <span style={{ color: '#202420' }}>Package</span>
                <span style={{ color: '#90AA90' }}>Phobia</span>
            </h1>

            <p>Find the cost of adding a new dev dependency to your project</p>

            <SearchBar autoFocus={true} />
        </PageContainer>

        <Footer />
    </>
);
