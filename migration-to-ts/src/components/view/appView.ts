import NewsData from '../interfaces/newsData';
import SourcesData from '../interfaces/sourcesData';
import { Data } from '../types/types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    public news: {
        draw(arr: NewsData['articles']): void;
    };
    public sources: {
        draw(arr: SourcesData['sources']): void;
    };

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Data): void {
        if ('articles' in data) {
            const values: NewsData['articles'] | [] = data?.articles ? data?.articles : [];
            this.news.draw(values);
        }
    }

    public drawSources(data: Data): void {
        if ('sources' in data) {
            const values: SourcesData['sources'] | [] = data?.sources ? data?.sources : [];
            this.sources.draw(values);
        }
    }
}

export default AppView;
