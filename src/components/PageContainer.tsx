import * as React from 'react';

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 6px)',
    padding: '1rem',
};

interface Props {}

const PageContainer: React.SFC<Props> = props => <div style={style}>{props.children}</div>;

export default PageContainer;
