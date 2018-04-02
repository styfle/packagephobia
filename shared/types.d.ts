interface PackageVersion {
    name: string;
    version: string | null;
    scoped: boolean;
}

interface SizeWithUnit {
    size: string;
    unit: string;
    readable: string;
}