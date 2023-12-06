export interface PackageVersion {
    name: string;
    version: string | null;
    scoped: boolean;
}

export interface SizeWithUnit {
    size: string;
    unit: string;
    pretty: string;
}

export interface PkgSize {
    name: string;
    version: string;
    publishSize: number;
    installSize: number;
    publishFiles: number;
    installFiles: number;
    disabled?: boolean;
}

export interface ApiResponseV1 {
    publishSize: number;
    installSize: number;
}

export interface ApiResponseV2 {
    name: string;
    version: string;
    publish: ApiResponseSize;
    install: ApiResponseSize;
}

export interface ApiResponseSize {
    bytes: number;
    files: number;
    pretty: string;
    color: string;
}

export interface ResultProps {
    pkgSize: PkgSize;
    readings: PkgSize[];
    cacheResult: boolean;
    isLatest: boolean;
    inputStr: string;
}

export interface ComparePackage {
    pkgSize: PkgSize;
    cacheResult: boolean;
    isLatest: boolean;
}

export interface CompareProps {
    inputStr: string;
    results: ComparePackage[];
}

export interface ParsedUrlQuery {
    [key: string]: string | string[] | undefined;
}

export interface NpmManifest {
    name: string;
    description: string;
    versions: { [version: string]: any };
    modified: string;
    'dist-tags': {
        latest: string;
        [tag: string]: string;
    };
}

export interface PackageJson {
    dependencies: {
        [key: string]: string;
    };
}
