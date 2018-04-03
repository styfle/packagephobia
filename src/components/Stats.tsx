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
        marginRight: '60px',
    };
    return (<div style={style}>
        <Stat {...props.publish} label="Publish" />
        <Stat {...props.install} label="Install" />
    </div>);
}

type StatProp = SizeWithUnit & { label: string };

function Stat(props: StatProp) {

    const styleValue: React.CSSProperties = {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#212121',
    };

    const styleUnit: React.CSSProperties = {
        fontSize: '2.4rem',
        color: '#666E78',
        fontWeight: 'bold',
        marginLeft: '4px',
    };

    const styleLabel: React.CSSProperties = {
        fontSize: '1rem',
        color: '#666E78',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textAlign: 'center',
        marginBottom: '25px',
    };

    return (<div>
        <span style={styleValue}>{props.size}</span>
        <span style={styleUnit}>{props.unit}</span>
        <div style={styleLabel}>{props.label}</div>
    </div>);
}