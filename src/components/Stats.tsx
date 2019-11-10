import React from 'react';

interface Props {
    publish: SizeWithUnit;
    install: SizeWithUnit;
}

export default function Stats(props: Props) {
    return (
        <div className="stats-container">
            <Stat {...props.publish} label="Publish Size" />
            <Stat {...props.install} label="Install Size" />
        </div>
    );
}

type StatProp = SizeWithUnit & { label: string };

function Stat(props: StatProp) {
    const styleValue: React.CSSProperties = {
        fontSize: '3rem',
        fontWeight: 700,
        color: '#212121',
    };

    const styleUnit: React.CSSProperties = {
        fontSize: '2.4rem',
        color: '#666e78',
        fontWeight: 700,
        marginLeft: '4px',
    };

    const styleLabel: React.CSSProperties = {
        fontSize: '1rem',
        color: '#666e78',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textAlign: 'center',
        marginBottom: '25px',
    };

    return (
        <div>
            <span style={styleValue}>{props.size}</span>
            <span style={styleUnit}>{props.unit}</span>
            <div style={styleLabel}>{props.label}</div>
        </div>
    );
}
