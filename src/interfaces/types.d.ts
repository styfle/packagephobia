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

interface ApiResponse {
    publishSize: number;
    installSize: number;
}

interface ResultProps {
    pkgSize: PkgSize;
    readings: PkgSize[];
    cacheResult: boolean;
}

interface ParsedUrlQuery {
    [key: string]: string | string[] | undefined;
}

interface NpmManifest {
    versions: { [version: string]: any };
    time: { [version: string]: string };
    'dist-tags': { latest: string };
}
