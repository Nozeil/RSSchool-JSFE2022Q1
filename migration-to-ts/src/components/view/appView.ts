import { APIPropValues } from '../enums/enums';
import { NewsDataI, SourcesDataI } from '../interfaces/interfaces';
import { DataT } from '../types/types';
import AppViewI from './appViewI';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements AppViewI {
    public news: {
        draw(arr: NewsDataI[APIPropValues.articles]): void;
    };
    public sources: {
        draw(arr: SourcesDataI[APIPropValues.sources]): void;
    };

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<DataT>): void {
        if (APIPropValues.articles in data) {
            const values: NewsDataI[APIPropValues.articles] | [] = data?.articles ? data?.articles : [];
            this.news.draw(values);
        }
    }

    public drawSources(data: Readonly<DataT>): void {
        if (APIPropValues.sources in data) {
            const values: SourcesDataI[APIPropValues.sources] | [] = data?.sources ? data?.sources : [];
            this.sources.draw(values);
        }
    }
}

export default AppView;
