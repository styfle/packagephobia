import * as React from 'react';
import PageContainer from '../components/PageContainer';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

const h1: React.CSSProperties = {
    letterSpacing: '4px',
    fontSize: '1.7rem',
    textTransform: 'uppercase',
    marginBottom: '0',
};

export default () => (
    <>
        <PageContainer>
            <svg width="108px" height="108px">
                <defs id="SvgjsDefs6088">
                    <linearGradient id="SvgjsLinearGradient6093">
                        <stop id="SvgjsStop6094" stopColor="#006838" offset="0" />
                        <stop id="SvgjsStop6095" stopColor="#96cf24" offset="1" />
                    </linearGradient>
                </defs>
                <g id="SvgjsG6089" fill="#000000" transform="matrix(1,0,0,1,0,0)" />
                <g
                    id="SvgjsG6090"
                    fill="url(#SvgjsLinearGradient6093)"
                    transform="matrix(1.25,0,0,1.25,-8.75,-7.5)"
                >
                    <polygon
                        xmlns="http://www.w3.org/2000/svg"
                        points="21.667,73.809 21.667,33.867 49.997,17.679 78.334,33.867 78.334,66.13 49.997,82.321 35,73.75 35,41.604   49.997,33.034 65,41.604 65,58.392 49.997,66.963 48.334,66.013 48.334,49.343 56.716,44.551 49.997,40.713 41.667,45.476   41.667,69.88 49.997,74.642 71.667,62.259 71.667,37.737 49.997,25.358 28.334,37.737 28.334,77.617 49.997,90 85,70 85,30   49.997,10 15,30 15,70 "
                    />
                </g>
            </svg>

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
