import * as React from 'react';
import Link from 'next/link';

const container: React.CSSProperties = {
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
    textAlign: 'center',
    fontFamily: '"Source Code Pro","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
    fontWeight: 300,
    width: '100%',
    border: '1px solid #eee',
    borderRadius: '3px 0px 0px 3px',
    height: '64px',
};

const button: React.CSSProperties = {
    width: '64px',
    height: '64px',
    marginLeft: '-64px',
    background: 'transparent',
    border: 'none',
    /*
    background: '#fcfcfc',
    border: '1px solid #eee',
    borderLeft: 'none',
    borderRadius: '0px 3px 3px 0px',*/
};

const footer: React.CSSProperties = {
    color: '#9daa9a',
    background: '#202420',
    width: '100%',
    fontSize: '13px',
};

const footerSection: React.CSSProperties = {
    display: 'flex',
    maxWidth: '800px',
    padding: '30px 10px',
    margin: 'auto',
};

const socialStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#ccc'
};

export default () =>
    <div style={container}>
        <h1 style={h1}>
            <span>Package</span>
            <span style={{ color:'#888' }}>Phobia</span>
        </h1>

        <svg width="200px" height="200px" fill="#01250f" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.435.153l-9.37 5.43c-.35.203-.564.578-.563.983V17.43c0 .404.215.78.564.982l9.37 5.435c.35.203.78.203 1.13 0l9.366-5.433c.35-.205.564-.578.565-.982V6.566c0-.404-.216-.78-.566-.984L12.567.152c-.35-.203-.782-.203-1.13 0"/></svg>

        <p>Find the cost of adding a new dev dependency to your project</p>
        
        <div>
            <form method="GET" action="/result" style={form}>
                <input
                    style={input}
                    type="text"
                    id="p"
                    name="p"
                    placeholder="webpack"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    autoFocus={true}
                />
                <button type="submit" style={button}>
                    <svg width="100%" height="100%" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><path d="M89.32 86.5L64.25 61.4C77.2 47 76.75 24.72 62.87 10.87 55.93 3.92 46.7.1 36.87.1s-19.06 3.82-26 10.77C3.92 17.8.1 27.05.1 36.87s3.82 19.06 10.77 26c6.94 6.95 16.18 10.77 26 10.77 9.15 0 17.8-3.32 24.55-9.4l25.08 25.1c.38.4.9.57 1.4.57.52 0 1.03-.2 1.42-.56.78-.78.78-2.05 0-2.83zM36.87 69.63c-8.75 0-16.98-3.4-23.17-9.6-6.2-6.2-9.6-14.42-9.6-23.17 0-8.75 3.4-16.98 9.6-23.17 6.2-6.2 14.42-9.6 23.17-9.6 8.75 0 16.98 3.4 23.18 9.6 12.77 12.75 12.77 33.55 0 46.33-6.2 6.2-14.43 9.6-23.18 9.6z"></path></svg>
                </button>
            </form>
        </div>

        <Link href="/about">
            <a>About</a>
        </Link>

        <footer style={footer}>
            <section style={footerSection}>
                <div>
                    <h3>What does this thing do?</h3>
                    <p>JavaScript bloat is more real today than it ever was.
                        Developer tools continuously get bigger as more (often redundant) libraries are thrown 
                        to solve new problems. Until of-course, the <i>big rewrite</i> happens.
                    </p>
                    <p>This thing lets you understand the performance cost of <code>npm&nbsp;install</code> ing a new npm package before actually using up the time and disk space on your computer.</p>
                    
                </div>
                <div>
                    <h3>Connect</h3>
                    <a style={socialStyle} href="https://github.com/styfle/packagephobia">
                        <svg width="24px" height="24px" fill="#9a6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                        <span>&nbsp;Star on GitHub</span>
                    </a>
                    <br/>
                    <a style={socialStyle} href="https://twitter.com/styfle">
                        <svg width="24px" height="24px" fill="#7af" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon">Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg>
                        <span>&nbsp;Chat on Twitter</span>
                    </a>
                    <p>I would greatly appreciate feedback or Pull Requests :)</p>
                </div>
            </section>
        </footer>
    </div>