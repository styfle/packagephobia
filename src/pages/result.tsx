import * as React from 'react';
import { pages, versionUnknown } from '../util/constants';
import { getReadableFileSize } from '../util/npm-parser';
import BarGraph from '../components/BarGraph';
import Stats from '../components/Stats';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Image from '../components/Image';

const container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120vh',
    marginTop: '-20vh',
};

const error: React.CSSProperties = {
    fontSize: '2.3rem',
    color: '#D33',
};

export default class ResultPage extends React.Component<ResultProps, {}> {
    render() {
        const { pkgSize, readings } = this.props;
        const exists = pkgSize.version !== versionUnknown;
        const install = getReadableFileSize(pkgSize.installSize);
        const publish = getReadableFileSize(pkgSize.publishSize);
        const pkgNameAndVersion = `${pkgSize.name}@${pkgSize.version}`;

        return (
            <>
                <div style={container}>
                    <SearchBar autoFocus={false} defaultValue={pkgNameAndVersion} />
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
                        <Image width={350} height={350} file="tumblebeasts/tbstand2.png" />
                    )}
                    <p>
                        See more info about this package on{' '}
                        <a href={`https://www.npmjs.com/package/${pkgSize.name}`}>npmjs.com</a>
                    </p>
                </div>
                <Footer />
            </>
        );
    }
}

const getHref = (r: PkgSize) => `${pages.result}?p=${r.name}@${r.version}`;
