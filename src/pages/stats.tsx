import * as React from 'react';
import PageContainer from '../components/PageContainer';
import Footer from '../components/Footer';
/*
import { pages } from '../util/constants';

const style: React.CSSProperties = {
    maxHeight: '150px',
    overflowY: 'auto',
    background: '#eee',
};
*/
export default (props: StatsProps) => (
    <>
        <PageContainer>
            <h1>Stats</h1>

            <p>Package Count: {props.packageCount}</p>
            <p>Package Verison Count: {props.packageVersionCount}</p>
        </PageContainer>
        <Footer />
    </>
);
