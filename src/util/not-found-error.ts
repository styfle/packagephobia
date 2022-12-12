export class NotFoundError extends Error {
    resource: string;
    constructor({ resource }: { resource: string }) {
        super(`Resource "${resource}" was not found`);
        this.name = 'NotFoundError';
        this.resource = resource;
    }
}
