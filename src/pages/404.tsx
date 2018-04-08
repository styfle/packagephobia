import * as React from 'react';

const style: React.CSSProperties = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

export default () => (
    <div style={style}>
        <h1>404 Not Found</h1>
        <div>Oops, this page does not exist.</div>
    </div>
);
