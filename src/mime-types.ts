import { extname } from 'path';

const data: { [ext: string]: string } = {
    '.js': 'application/javascript',
    '.map': 'application/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.html': 'text/html',
    '.txt': 'text/plain',
};

export function lookup(path: string): string {
    const ext = extname(path);
    const mime = data[ext];
    if (!mime) {
        throw new Error(`No mime type for file: ${path}`);
    }
    return mime;
}
