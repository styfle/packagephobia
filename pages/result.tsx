import * as React from 'react';
import 'isomorphic-unfetch';
import { parsePackageString, getReadableFileSize } from '../src/utils';


interface Props {
    //url: { query: any };
    pkgVersion: PackageVersion;
    size: number; // bytes
}

interface State {}

export default class ResultPage extends React.Component<Props, State> {
    static async getInitialProps(props: { req: any, query: any }) {
        const { req, query } = props;
        const isServer = !!req
        const pkg = query.p;
        const env = isServer ? 'server' : 'client';
        console.log(`getInitialProps() was called on the ${env} for package ${pkg}`);

        if (isServer) {
            // TODO: fix this since its trying to render on client for some reason
            //const { getPackageSize } = await import('../src/pkg-stats');
            const pkgVersion = parsePackageString(pkg);
            //const size = await getPackageSize(pkg);
            const size = 1237532;
            return { pkgVersion, size };
        } else {
            // On the client, we should fetch the data remotely
            // TODO: fix this so that it fetches the size
            const res = await fetch('/_data/item', { headers: {'Accept': 'application/json'} });
            const json = await res.json();
            const pkgVersion = json;
            const size = 0;
            return { pkgVersion, size };
        }
    }

    render () {
        const { pkgVersion, size } = this.props;
        const readableSize = getReadableFileSize(size);

        const container: React.CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        };

        return (<div style={container}>
            <h1>{pkgVersion.name}@{pkgVersion.version}</h1>
            <p>Package {pkgVersion.name} is size {readableSize}</p>
        </div>);
    }
}