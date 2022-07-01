import { articles } from '../types/newsDataArticles';

export default interface NewsData {
    status: string;
    totalResults: number;
    articles: Array<articles>;
}
