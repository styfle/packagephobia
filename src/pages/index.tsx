import React from 'react';

import Sponsors from '../components/Sponsors';
import PageContainer from '../components/PageContainer';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

import { pages } from '../util/constants';

const h1: React.CSSProperties = {
    letterSpacing: '4px',
    fontSize: '1.7rem',
    textTransform: 'uppercase',
    marginBottom: '0',
};

export default () => (
    <>
        <PageContainer>
            <span dangerouslySetInnerHTML={{ __html: Logo('main') }} />

            <h1 style={h1}>
                <span className="logo_package">Package</span>
                <span className="logo_phobia">Phobia</span>
            </h1>

            <p style={{ textAlign: 'center' }}>
                Find the cost of adding a new dev dependency to your project
            </p>

            <SearchBar autoFocus={true} />

            <form
                style={{ marginTop: '30px' }}
                method="post"
                action={pages.compare}
                encType="multipart/form-data"
            >
                <label>
                    <span style={{ marginRight: '20px' }}>Or upload a package.json</span>
                    <input name="package.json" type="file" accept="application/json" />
                </label>
                <noscript>
                    <button type="submit" value="submit">
                        Submit
                    </button>
                </noscript>
            </form>

            <Sponsors />
        </PageContainer>
        <Footer />
    </>
);
