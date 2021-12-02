import React from 'react';
import { escape } from 'querystring';
import LinkedLogo from './LinkedLogo';

interface Props {
    pkgSize: PkgSize;
    isLatest: boolean;
}

export default (props: Props) => {
    const { pkgSize, isLatest } = props;
    const { name, version } = pkgSize;

    return (
        <>
            <LinkedLogo
                name={name}
                icon="npm"
                color="#CB3837"
                title="npm"
                href={
                    isLatest
                        ? `https://www.npmjs.com/package/${name}`
                        : `https://www.npmjs.com/package/${name}/v/${version}`
                }
            />
            <LinkedLogo
                name={name}
                icon="cloudflare"
                color="#222"
                title="unpkg"
                href={
                    isLatest
                        ? `https://unpkg.com/${name}/`
                        : `https://unpkg.com/${name}@${version}/`
                }
            />
            <LinkedLogo
                name={name}
                icon="jsdelivr"
                color="#F38020"
                title="jsdelivr"
                href={
                    isLatest
                        ? `https://cdn.jsdelivr.net/npm/${name}/`
                        : `https://cdn.jsdelivr.net/npm/${name}@${version}/`
                }
            />
            <LinkedLogo
                name={name}
                icon="libraries"
                color="#9B59B6"
                title="libraries"
                href={
                    isLatest
                        ? `https://libraries.io/npm/${name}`
                        : `https://libraries.io/npm/${name}/${version}`
                }
            />
            <LinkedLogo
                name={name}
                icon="graphql"
                color="#36394A"
                title="graph"
                href={
                    isLatest
                        ? `https://npm.anvaka.com/#/view/2d/${escape(escape(name))}`
                        : `https://npm.anvaka.com/#/view/2d/${escape(escape(name))}/${version}`
                }
            />
        </>
    );
};
