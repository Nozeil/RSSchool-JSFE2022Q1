import { CallbackI } from '../interfaces/interfaces';

export default interface AppControllerI {
    getSources(callback: CallbackI): void;
    getNews(e: MouseEvent, callback: CallbackI): void;
}
