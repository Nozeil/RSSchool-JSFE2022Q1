import { Articles } from '../types/newsDataArticles';

export default interface NewsData {
    status: string;
    totalResults: number;
    articles: Array<Articles>;
}
