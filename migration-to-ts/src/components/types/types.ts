import NewsData from '../interfaces/newsData';
import SourcesData from '../interfaces/sourcesData';

export type Endpoints = 'everything' | 'sources';

export type Data = NewsData | SourcesData;
