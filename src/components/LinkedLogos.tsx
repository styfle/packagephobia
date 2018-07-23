import * as React from 'react';
import LinkedLogo from './LinkedLogo';

export default (props: { name: string }) => (
    <>
        <LinkedLogo
            name={props.name}
            icon="npm"
            color="#CB3837"
            title="npm"
            href={`https://www.npmjs.com/package/${props.name}`}
        />
        <LinkedLogo
            name={props.name}
            icon="cloudflare"
            color="#222"
            title="unpkg"
            href={`https://unpkg.com/${props.name}/`}
        />
        <LinkedLogo
            name={props.name}
            icon="jsdelivr"
            color="#F38020"
            title="jsdelivr"
            href={`https://cdn.jsdelivr.net/npm/${props.name}/`}
        />
        <LinkedLogo
            name={props.name}
            icon="libraries"
            color="#9B59B6"
            title="libraries"
            href={`https://libraries.io/npm/${props.name}/`}
        />
        <LinkedLogo
            name={props.name}
            icon="graphql"
            color="#36394A"
            title="graph"
            href={`https://npm.anvaka.com/#/view/2d/${props.name}/`}
        />
    </>
);
