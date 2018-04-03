export function control(isProd: boolean, days: number): string {
    if (days === 0 || !isProd) {
        return 'public, no-cache, no-store, must-revalidate';
    }
    const sec = days * 24 * 60 * 60;
    return `public, max-age=${sec}`;
}
