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
};

const form: React.CSSProperties = {
    display: 'flex',
};

const input: React.CSSProperties = {
    fontSize: '2.4rem',
    padding: '10px 50px 10px 10px',
    fontFamily: '"Source Code Pro","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
    fontWeight: 300,
    width: '100%',
    border: 0
};

export default () =>
    <div style={container}>
        <h1 style={h1}>
            <span>Package</span>
            <span style={{color:'#888'}}>Phobia</span>
        </h1>
        <p>Find the cost of adding a new dev dependency to your project</p>
        
        <div>
            <form method="GET" action="/result" style={form}>
                <input
                    style={input}
                    type="search"
                    id="p"
                    name="p"
                    placeholder="ava"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    autoFocus={true}
                />
                <button type="submit">
                    <svg width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" data-reactid="44"><path d="M89.32 86.5L64.25 61.4C77.2 47 76.75 24.72 62.87 10.87 55.93 3.92 46.7.1 36.87.1s-19.06 3.82-26 10.77C3.92 17.8.1 27.05.1 36.87s3.82 19.06 10.77 26c6.94 6.95 16.18 10.77 26 10.77 9.15 0 17.8-3.32 24.55-9.4l25.08 25.1c.38.4.9.57 1.4.57.52 0 1.03-.2 1.42-.56.78-.78.78-2.05 0-2.83zM36.87 69.63c-8.75 0-16.98-3.4-23.17-9.6-6.2-6.2-9.6-14.42-9.6-23.17 0-8.75 3.4-16.98 9.6-23.17 6.2-6.2 14.42-9.6 23.17-9.6 8.75 0 16.98 3.4 23.18 9.6 12.77 12.75 12.77 33.55 0 46.33-6.2 6.2-14.43 9.6-23.18 9.6z" data-reactid="45"></path></svg>
                </button>
            </form>
        </div>

        <Link href="/about">
            <a>About</a>
        </Link>
    </div>