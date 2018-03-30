import * as React from 'react';

interface Props {
    publishSize: number;
    installSize: number;
}


export default function Stats(props: Props) {
    const style: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };
    return (<div style={style}>
        <Stat size={props.publishSize} unit="MB" />
        <Stat size={props.installSize} unit="MB" />
    </div>);
}

function Stat(props: {size: number, unit: string}) {

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