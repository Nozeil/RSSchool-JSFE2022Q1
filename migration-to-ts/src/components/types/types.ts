import { APIPropValues } from '../enums/enums';
import { NewsDataI, SourcesDataI } from '../interfaces/interfaces';

export type Endpoints = APIPropValues.everything | APIPropValues.sources;

export type Data = NewsDataI | SourcesDataI;

export type Articles = {
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

export type TSources = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};
