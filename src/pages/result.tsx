import * as React from 'react';
import 'isomorphic-unfetch';
import { parsePackageString, getReadableFileSize } from '../parse-utils';
import BarGraph from '../components/BarGraph';
import Stats from '../components/Stats';

interface Props {
    //url: { query: any };
    pkgVersion: PackageVersion;
    size: number; // bytes
}

interface State {}

export default class ResultPage extends React.Component<Props, State> {
    static async getInitialProps(props: { req: any, query: any }): Promise<Props> {
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
        const install = getReadableFileSize(90031);
        const publish = getReadableFileSize(70031);

        const container: React.CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        };

        const h1: React.CSSProperties = {
            fontFamily: '"Source Code Pro","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace'
        }

        const readings = [
            {
                version: '1.0.0',
                installSize: 200124,
                publishSize: 123541,
                disabled: true,
            },
            {
                version: '1.0.0',
                installSize: 200124,
                publishSize: 123541,
                disabled: false,
            },
            {
                version: '1.0.1',
                installSize: 200224,
                publishSize: 123641,
                disabled: false,
            },
            {
                version: '1.0.2',
                installSize: 200524,
                publishSize: 123941,
                disabled: false,
            },
            {
                version: '1.0.3',
                installSize: 200824,
                publishSize: 124041,
                disabled: false,
            },
            {
                version: '1.0.4',
                installSize: 500924,
                publishSize: 324241,
                disabled: false,
            },
        ];

        const current = readings.find(o => o.version === pkgVersion.version);

        if (!current) {
            console.error('Failed to find version ' + pkgVersion.version)
            return null;
        }

        return (<div style={container}>
            <h1 style={h1}>{pkgVersion.name}@{pkgVersion.version}</h1>
            <p>Package {pkgVersion.name} is {readableSize.readable} after npm install</p>
            <div style={{ display: 'flex' }}>
                <Stats publish={publish} install={install} />
                <BarGraph readings={readings} onBarClick={r => console.log('you clicked ' + r.version)} />
            </div>
            
        </div>);
    }
}