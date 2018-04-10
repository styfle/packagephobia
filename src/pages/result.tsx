import * as React from 'react';
import { pages } from '../constants';
import { getReadableFileSize } from '../parse-utils';
import BarGraph from '../components/BarGraph';
import Stats from '../components/Stats';
import Footer from '../components/Footer';

const container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120vh',
    marginTop: '-20vh',
};

const h1: React.CSSProperties = {
    fontFamily:
        '"Source Code Pro","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
};

const error: React.CSSProperties = {
    fontSize: '2.3rem',
    color: '#D33',
};

const imgSrc =
    'https://res.cloudinary.com/ceriously/image/upload/c_scale,w_350/tumblebeasts/tbstand2.png';

export default class ResultPage extends React.Component<ResultProps, {}> {
    render() {
        const { pkgSize, readings } = this.props;
        const exists = pkgSize.version !== 'unknown';
        const install = getReadableFileSize(pkgSize.installSize);
        const publish = getReadableFileSize(pkgSize.publishSize);

        return (
            <>
                <div style={container}>
                    <h1 style={h1}>
                        {pkgSize.name}@{pkgSize.version}
                    </h1>
                    {exists ? (
                        <p>Package is {install.readable} after npm install</p>
                    ) : (
                        <p style={error}>A Tumbeast ate your package</p>
                    )}
                    {exists ? (
                        <div style={{ display: 'flex' }}>
                            <Stats publish={publish} install={install} />
                            <BarGraph readings={readings} getHref={getHref} />
                        </div>
                    ) : (
                        <img src={imgSrc} width="350px" height="350px" />
                    )}
                </div>
                <Footer />
            </>
        );
    }
}

const getHref = (r: PkgSize) => `${pages.result}?p=${r.name}@${r.version}`;
