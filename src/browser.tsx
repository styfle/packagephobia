import * as React from 'react';
import { hydrate } from 'react-dom';
import Index from './pages/index';
import { containerId } from './util/constants';

const app = <Index />;
const el = document.getElementById(containerId);
hydrate(app, el);
