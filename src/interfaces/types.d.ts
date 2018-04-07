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

interface PkgSize {
    name: string;
    version: string;
    publishSize: number;
    installSize: number;
    disabled?: boolean;
}

interface ResultProps {
    pkgSize: PkgSize;
    readings: PkgSize[];
}

interface ParsedUrlQuery { [key: string]: string | string[]; }