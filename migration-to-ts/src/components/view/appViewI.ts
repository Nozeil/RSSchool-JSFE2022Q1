import { NewsDataI, SourcesDataI } from '../interfaces/interfaces';
import { Data } from '../types/types';
import { APIPropValues } from '../enums/enums';

export default interface AppViewI {
    news: { draw(arr: NewsDataI[APIPropValues.articles]): void };
    sources: { draw(arr: SourcesDataI[APIPropValues.sources]): void };

    drawNews(data: Readonly<Data>): void;
    drawSources(data: Readonly<Data>): void;
}
