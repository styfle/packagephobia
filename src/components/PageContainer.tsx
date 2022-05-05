import React from 'react';

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '1rem',
};

interface Props {
    children: React.ReactNode;
}

export default function PageContainer(props: Props) {
    return <div style={style}>{props.children}</div>;
}
