interface PackageVersion {
    name: string;
    version: string | null;
    scoped: boolean;
}

interface SizeWithUnit {
    size: string;
    unit: string;
    pretty: string;
}

interface PkgSize {
    name: string;
    version: string;
    publishSize: number;
    installSize: number;
    disabled?: boolean;
}

interface ApiResponseV1 {
    publishSize: number;
    installSize: number;
}

interface ApiResponseV2 {
    name: string;
    version: string;
    publish: ApiResponseSize;
    install: ApiResponseSize;
}

interface ApiResponseSize {
    bytes: number;
    pretty: string;
    color: string;
}

interface ResultProps {
    pkgSize: PkgSize;
    readings: PkgSize[];
    cacheResult: boolean;
    isLatest: boolean;
}

interface ComparePackage {
    pkgSize: PkgSize;
    cacheResult: boolean;
    isLatest: boolean;
}

interface CompareProps {
    results: ComparePackage[];
}

interface ParsedUrlQuery {
    [key: string]: string | string[] | undefined;
}

interface NpmManifest {
    versions: { [version: string]: any };
    time: { [version: string]: string };
    'dist-tags': { [tag: string]: string };
}
