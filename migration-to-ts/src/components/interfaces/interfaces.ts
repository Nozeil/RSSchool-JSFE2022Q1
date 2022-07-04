import { ArticlesT, DataT, SourcesT } from '../types/types';

export interface OptionsI {
    [s: string]: string | undefined;
}

export interface CallbackI {
    (d: DataT): void;
}

export interface NewsDataI {
    status: string;
    totalResults: number;
    articles: Array<ArticlesT>;
}

export interface SourcesDataI {
    status: string;
    sources: Array<SourcesT>;
}
