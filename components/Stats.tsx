import * as React from 'react';

interface Props {
    publish: SizeWithUnit;
    install: SizeWithUnit;
}

export default function Stats(props: Props) {
    const style: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };
    return (<div style={style}>
        <Stat {...props.publish} />
        <Stat {...props.install} />
    </div>);
}

function Stat(props: SizeWithUnit) {

    const styleValue: React.CSSProperties = {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#212121',
        background: 'white',
        transitionDuration: '616s'
    };

    const styleUnit: React.CSSProperties = {
        fontSize: '2.4rem',
        color: '#666E78',
        fontWeight: 'bold',
        marginLeft: '4px',
    };

    return (<div>
        <span style={styleValue}>{props.size}</span>
        <span style={styleUnit}>{props.unit}</span>
    </div>);
}