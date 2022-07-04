import { NewsDataI, SourcesDataI } from '../interfaces/interfaces';
import { DataT } from '../types/types';
import { APIPropValues } from '../enums/enums';

export default interface AppViewI {
    news: { draw(arr: NewsDataI[APIPropValues.articles]): void };
    sources: { draw(arr: SourcesDataI[APIPropValues.sources]): void };

    drawNews(data: Readonly<DataT>): void;
    drawSources(data: Readonly<DataT>): void;
}
