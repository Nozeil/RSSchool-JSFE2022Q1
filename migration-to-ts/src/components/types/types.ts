import { APIPropValues } from '../enums/enums';
import { NewsDataI, SourcesDataI } from '../interfaces/interfaces';

export type EndpointsT = APIPropValues.everything | APIPropValues.sources;

export type DataT = NewsDataI | SourcesDataI;

export type ArticlesT = {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type SourcesT = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type SourcesDrawDataT = Readonly<Pick<SourcesDataI, APIPropValues.sources>[APIPropValues.sources]>;

export type NewsDrawDataT = Readonly<Pick<NewsDataI, APIPropValues.articles>[APIPropValues.articles]>;
