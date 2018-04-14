import * as React from 'react';
import { pages } from '../util/constants';

const form: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '90vw',
};

const height = '4rem';
const radius = '3px';

const input: React.CSSProperties = {
    color: '#333',
    fontSize: '2.4rem',
    textAlign: 'center',
    fontFamily:
        '"Source Code Pro","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
    fontWeight: 300,
    width: '100%',
    border: '1px solid #eee',
    borderRadius: `${radius} 0px 0px ${radius}`,
    height: height,
};

const button: React.CSSProperties = {
    width: height,
    height: height,
    padding: '0.5rem',
    background: '#fcfcfc',
    border: '1px solid #eee',
    borderLeft: 'none',
    borderRadius: `0px ${radius} ${radius} 0px`,
};

export default (props: { autoFocus: boolean; defaultValue?: string }) => (
    <form method="GET" action={pages.result} style={form}>
        <input
            style={input}
            type="text"
            id="p"
            name="p"
            placeholder="webpack"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            autoFocus={props.autoFocus}
            defaultValue={props.defaultValue}
        />
        <button type="submit" style={button}>
            <svg width="100%" height="100%" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
                <path d="M89.32 86.5L64.25 61.4C77.2 47 76.75 24.72 62.87 10.87 55.93 3.92 46.7.1 36.87.1s-19.06 3.82-26 10.77C3.92 17.8.1 27.05.1 36.87s3.82 19.06 10.77 26c6.94 6.95 16.18 10.77 26 10.77 9.15 0 17.8-3.32 24.55-9.4l25.08 25.1c.38.4.9.57 1.4.57.52 0 1.03-.2 1.42-.56.78-.78.78-2.05 0-2.83zM36.87 69.63c-8.75 0-16.98-3.4-23.17-9.6-6.2-6.2-9.6-14.42-9.6-23.17 0-8.75 3.4-16.98 9.6-23.17 6.2-6.2 14.42-9.6 23.17-9.6 8.75 0 16.98 3.4 23.18 9.6 12.77 12.75 12.77 33.55 0 46.33-6.2 6.2-14.43 9.6-23.18 9.6z" />
            </svg>
        </button>
    </form>
);
