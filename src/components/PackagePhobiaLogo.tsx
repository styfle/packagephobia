import { readFileSync } from 'fs';
export default () => readFileSync(`${__dirname}/../../public/logo.svg`, 'utf8');
