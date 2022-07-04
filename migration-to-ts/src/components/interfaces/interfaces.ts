import { Articles, Data, TSources } from '../types/types';

export interface OptionsI {
    [s: string]: string | undefined;
}

export interface CallbackI {
    (d: Data): void;
}

export interface NewsDataI {
    status: string;
    totalResults: number;
    articles: Array<Articles>;
}

export interface SourcesDataI {
    status: string;
    sources: Array<TSources>;
}
