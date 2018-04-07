import * as React from 'react';
import { getReadableFileSize } from '../parse-utils';
import BarGraph from '../components/BarGraph';
import Stats from '../components/Stats';

export default class ResultPage extends React.Component<ResultProps, {}> {
    render () {
        const { pkgSize, readings } = this.props;
        const install = getReadableFileSize(pkgSize.installSize);
        const publish = getReadableFileSize(pkgSize.publishSize);

        const container: React.CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        };

        const h1: React.CSSProperties = {
            fontFamily: '"Source Code Pro","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace'
        };

        if (!pkgSize) {
            console.error('Failed to find version ');
            return null;
        }

        return (<div style={container}>
            <h1 style={h1}>{pkgSize.name}@{pkgSize.version}</h1>
            <p>Package {pkgSize.name} is {install.readable} after npm install</p>
            <div style={{ display: 'flex' }}>
                <Stats publish={publish} install={install} />
                <BarGraph readings={readings} getHref={getHref} />
            </div>
            
        </div>);
    }
}

const getHref = (r: PkgSize) => `/result.html?p=${r.name}@${r.version}`