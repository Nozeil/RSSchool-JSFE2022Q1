import APIPropValues from '../enums/APIPropValues';
import { NewsData, SourcesData } from '../interfaces/interfaces';
import { Data } from '../types/types';
import AppViewI from './appViewI';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements AppViewI {
    public news: {
        draw(arr: NewsData[APIPropValues.articles]): void;
    };
    public sources: {
        draw(arr: SourcesData[APIPropValues.sources]): void;
    };

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<Data>): void {
        if (APIPropValues.articles in data) {
            const values: NewsData[APIPropValues.articles] | [] = data?.articles ? data?.articles : [];
            this.news.draw(values);
        }
    }

    public drawSources(data: Readonly<Data>): void {
        if (APIPropValues.sources in data) {
            const values: SourcesData[APIPropValues.sources] | [] = data?.sources ? data?.sources : [];
            this.sources.draw(values);
        }
    }
}

export default AppView;
