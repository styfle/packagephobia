import * as React from 'react';
import Link from 'next/link';

const container: React.CSSProperties = {
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const h1: React.CSSProperties = {
    letterSpacing: '4px',
    fontSize: '1.7rem',
    textTransform: 'uppercase',
}

export default () =>
    <div style={container}>
        <h1 style={h1}>
            <span>Package</span>
            <span style={{color:'#888'}}>Phobia</span>
        </h1>
        <p>Find the cost of adding a new dev dependency to your project</p>
        <Link href="/about">
            <a>About</a>
        </Link>
    </div>