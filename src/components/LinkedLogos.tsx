import * as React from 'react';
import LinkedLogo from './LinkedLogo';

export default (props: { pkgSize: PkgSize }) => (
    <>
        <LinkedLogo
            name={props.pkgSize.name}
            icon="npm"
            color="#CB3837"
            title="npm"
            href={`https://www.npmjs.com/package/${props.pkgSize.name}/v/${props.pkgSize.version}`}
        />
        <LinkedLogo
            name={props.pkgSize.name}
            icon="cloudflare"
            color="#222"
            title="unpkg"
            href={`https://unpkg.com/${props.pkgSize.name}@${props.pkgSize.version}/`}
        />
        <LinkedLogo
            name={props.pkgSize.name}
            icon="jsdelivr"
            color="#F38020"
            title="jsdelivr"
            href={`https://cdn.jsdelivr.net/npm/${props.pkgSize.name}@${props.pkgSize.version}/`}
        />
        <LinkedLogo
            name={props.pkgSize.name}
            icon="libraries"
            color="#9B59B6"
            title="libraries"
            href={`https://libraries.io/npm/${props.pkgSize.name}/${props.pkgSize.version}`}
        />
        <LinkedLogo
            name={props.pkgSize.name}
            icon="graphql"
            color="#36394A"
            title="graph"
            href={`https://npm.anvaka.com/#/view/2d/${props.pkgSize.name}/`}
        />
    </>
);
