import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import * as fs from 'fs';

const stylesheet = `
body {
    margin: 0;
    padding: 0;
    background: #fafafa;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
}
`;

export default class MyDocument extends Document {
    render () {
        return (
            <html>
                <Head>
                    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}