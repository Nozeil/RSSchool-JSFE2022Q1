import { NewsData, SourcesData } from '../interfaces/interfaces';
import { Data } from '../types/types';
import APIPropValues from '../enums/APIPropValues';

export default interface AppViewI {
    news: { draw(arr: NewsData[APIPropValues.articles]): void };
    sources: { draw(arr: SourcesData[APIPropValues.sources]): void };

    drawNews(data: Readonly<Data>): void;
    drawSources(data: Readonly<Data>): void;
}
