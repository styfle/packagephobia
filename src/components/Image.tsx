import React from 'react';

interface Props {
    width: number;
    height: number;
    file: string;
}

const prefix = 'https://res.cloudinary.com/ceriously/image/upload';

export default (props: Props) => (
    <img
        width={props.width}
        height={props.height}
        src={`${prefix}/c_scale,w_${props.width},h_${props.height}/${props.file}`}
    />
);
