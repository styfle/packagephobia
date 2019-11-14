import React from 'react';

const footer: React.CSSProperties = {
    color: '#90AA90',
    background: '#202420',
    width: '100%',
    fontSize: '0.9rem',
};

const footerSection: React.CSSProperties = {
    display: 'flex',
    maxWidth: '50rem',
    padding: '1rem 0',
    margin: 'auto',
    flexWrap: 'wrap',
};

const social: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#ccc',
    width: '11rem',
    margin: '0 0 1rem 0.5rem',
};

const footerDiv: React.CSSProperties = {
    margin: '1rem 2rem',
    maxWidth: '30rem',
};

const footerLink: React.CSSProperties = {
    color: '#ccc',
};

export default () => (
    <footer style={footer}>
        <section style={footerSection}>
            <div style={footerDiv}>
                <h3>What is Package Phobia?</h3>
                <p>
                    Package Phobia reports the size of an npm package <em>before</em> you install
                    it.
                </p>
                <p>
                    This is useful for inspecting potential <code>dependencies</code> or{' '}
                    <code>devDependencies</code> without using up precious disk space or waiting
                    minutes for <code>npm&nbsp;install</code>.
                </p>
                <h3>What is "publish size" vs "install size"?</h3>
                <p>
                    The "publish size" is the size of the source code published to npm. This number
                    is easy to detect and is typically very small.
                </p>
                <p>
                    The "install size" is the size your hard drive will report after running{' '}
                    <code>npm&nbsp;install</code>. This includes the package, all of the
                    dependencies, and its dependency's dependencies...and so on.
                </p>
                <p>
                    See the{' '}
                    <a
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/styfle/packagephobia/blob/master/README.md"
                        style={footerLink}
                    >
                        README
                    </a>{' '}
                    for more info.
                </p>
            </div>
            <div style={footerDiv}>
                <h3>Connect</h3>
                <a style={social} href="https://github.com/styfle/packagephobia">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#9a6"
                        viewBox="0 0 24 24"
                    >
                        <title>GitHub icon</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>

                    <span>&nbsp;Star on GitHub</span>
                </a>
                <a style={social} href="https://twitter.com/styfle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#7af"
                        viewBox="0 0 24 24"
                    >
                        <title>Twitter icon</title>
                        <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>

                    <span>&nbsp;Chat on Twitter</span>
                </a>
                <a style={social} href="https://www.ceriously.com">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#00796b"
                        viewBox="0 0 24 24"
                    >
                        <title>Ceriously icon</title>
                        <path d="M11.997 24L1.605 17.997v-12L12 0l10.396 5.997L16.5 9.402 12 6.8 7.496 9.4v5.2l4.502 2.6 4.5-2.6 5.895 3.397L12.003 24h-.006z" />
                    </svg>

                    <span>&nbsp;Get ceriously</span>
                </a>
                <a style={social} href="https://zeit.co/now">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="100 120 300 300"
                    >
                        <title>ZEIT Logo</title>
                        <path fill="#fff" d="M254 156.459L367 356H141z" />
                    </svg>

                    <span>&nbsp;Hosted on ZEIT Now</span>
                </a>
            </div>
        </section>
    </footer>
);
