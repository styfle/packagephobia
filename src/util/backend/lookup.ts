import { extname } from 'path';

const data: { [ext: string]: string } = {
    '.js': 'application/javascript',
    '.map': 'application/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.html': 'text/html',
    '.txt': 'text/plain',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.xml': 'application/xml',
    '.png': 'image/png',
    '.webmanifest': 'application/manifest+json',
};

export function mimeType(path: string): string {
    const ext = extname(path);
    const mime = data[ext];
    if (!mime) {
        throw new Error(`No mime type for file: ${path}`);
    }
    return mime;
}

export function cacheControl(isProd: boolean, days: number): string {
    if (!isProd) {
        return 'public, no-cache, no-store, must-revalidate';
    }
    const sec = days === 0 ? 30 : days * 24 * 60 * 60;
    return `public, s-maxage=${sec}, max-age=${sec}`;
}
