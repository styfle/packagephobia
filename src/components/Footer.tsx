import * as React from 'react';

const footer: React.CSSProperties = {
    color: '#90AA90',
    background: '#202420',
    width: '100%',
    fontSize: '0.9rem',
};

const footerSection: React.CSSProperties = {
    display: 'flex',
    maxWidth: '50rem',
    margin: 'auto',
    flexWrap: 'wrap',
};

const social: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#ccc',
    width: '10rem',
    margin: '0 0 1rem 0.5rem',
};

const footerDiv: React.CSSProperties = {
    margin: '2rem 2rem 0 2rem',
    maxWidth: '30rem',
};

export default () => {
    return (
        <footer style={footer}>
            <section style={footerSection}>
                <div style={footerDiv}>
                    <h3>What is Package Phobia?</h3>
                    <p>
                        Package Phobia reports the size of an npm package <em>before</em> you
                        install it.
                    </p>
                    <p>
                        This is useful for inspecting potential <code>dependencies</code> or
                        <code>devDependencies</code> without using up precious disk space or
                        waiting minutes for <code>npm&nbsp;install</code>.
                    </p>
                    <h3>What is "publish size" vs "install size"?</h3>
                    <p>
                        The "publish size" is the size of the source code published to npm. This
                        number is easy to detect and is typically very small.
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
                            href="https://github.com/styfle/packagephobia/blob/master/README.md"
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
                            width="24px"
                            height="24px"
                            fill="#9a6"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>GitHub icon</title>
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        <span>&nbsp;Star on GitHub</span>
                    </a>
                    <a style={social} href="https://twitter.com/styfle">
                        <svg
                            width="24px"
                            height="24px"
                            fill="#7af"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Twitter icon</title>
                            <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                        </svg>
                        <span>&nbsp;Chat on Twitter</span>
                    </a>
                    <a style={social} href="https://www.ceriously.com">
                        <svg
                            width="24px"
                            height="24px"
                            fill="#00796b"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Ceriously icon</title>
                            <path d="M11.997 24L1.605 17.997v-12L12 0l10.396 5.997L16.5 9.402 12 6.8 7.496 9.4v5.2l4.502 2.6 4.5-2.6 5.895 3.397L12.003 24h-.006z" />
                        </svg>
                        <span>&nbsp;Get ceriously</span>
                    </a>
                    <a style={social} href="https://zeit.co/now">
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="100 120 300 300"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Zeit Logo</title>
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g fill="#FFFFFF">
                                    <polygon points="254 156.459299 367 356 141 356" />
                                </g>
                            </g>
                        </svg>

                        <span>&nbsp;Hosted on Now</span>
                    </a>
                </div>
            </section>
        </footer>
    );
};
