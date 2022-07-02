import { Articles } from '../types/types';

export default interface NewsData {
    status: string;
    totalResults: number;
    articles: Array<Articles>;
}
