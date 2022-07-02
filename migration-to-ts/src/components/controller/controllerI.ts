import { Callback } from '../interfaces/interfaces';

export default interface AppControllerI {
    getSources(callback: Callback): void;
    getNews(e: MouseEvent, callback: Callback): void;
}
