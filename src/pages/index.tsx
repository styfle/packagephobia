import * as React from 'react';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

const container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
};

const h1: React.CSSProperties = {
    letterSpacing: '4px',
    fontSize: '1.7rem',
    textTransform: 'uppercase',
    marginBottom: '0',
};

export default () => (
    <>
        <div style={container}>
            <svg
                width="150px"
                height="150px"
                fill="#01250f"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M11.435.153l-9.37 5.43c-.35.203-.564.578-.563.983V17.43c0 .404.215.78.564.982l9.37 5.435c.35.203.78.203 1.13 0l9.366-5.433c.35-.205.564-.578.565-.982V6.566c0-.404-.216-.78-.566-.984L12.567.152c-.35-.203-.782-.203-1.13 0" />
            </svg>

            <h1 style={h1}>
                <span>Package</span>
                <span style={{ color: '#888' }}>Phobia</span>
            </h1>

            <p>Find the cost of adding a new dev dependency to your project</p>

            <SearchBar autoFocus={true} />
        </div>

        <Footer />
    </>
);
