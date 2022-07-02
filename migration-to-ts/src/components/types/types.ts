import APIPropValues from '../enums/APIPropValues';
import NewsData from '../interfaces/newsData';
import SourcesData from '../interfaces/sourcesData';

export type Endpoints = APIPropValues.everything | APIPropValues.sources;

export type Data = NewsData | SourcesData;
