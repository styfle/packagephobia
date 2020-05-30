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

type StatProp = {
    size: string;
    unit: string;
    label: string;
    scale?: number;
    color?: string;
};

export function Stat(props: StatProp) {
    const { size, unit, label, scale = 1, color = '#212121' } = props;

    const styleValue: React.CSSProperties = {
        fontSize: `${3 * scale}rem`,
        fontWeight: 'bold',
        color,
    };

    const styleUnit: React.CSSProperties = {
        fontSize: `${2.4 * scale}rem`,
        color: '#666E78',
        fontWeight: 'bold',
        marginLeft: '4px',
    };

    const styleLabel: React.CSSProperties = {
        fontSize: `${1 * scale}rem`,
        color: '#666E78',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textAlign: 'center',
        marginBottom: '25px',
    };

    return (
        <div>
            <span style={styleValue}>{size}</span>
            <span style={styleUnit}>{unit}</span>
            <div style={styleLabel}>{label}</div>
        </div>
    );
}
