import { Articles, Data, TSources } from '../types/types';

export interface Options {
    [s: string]: string | undefined;
}

export interface Callback {
    (d: Data): void;
}

export interface NewsData {
    status: string;
    totalResults: number;
    articles: Array<Articles>;
}

export interface SourcesData {
    status: string;
    sources: Array<TSources>;
}
