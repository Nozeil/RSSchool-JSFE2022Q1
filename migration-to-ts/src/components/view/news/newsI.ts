import { NewsData } from '../../interfaces/interfaces';
import APIPropValues from '../../enums/APIPropValues';

export default interface NewsI {
    draw(data: Readonly<Pick<NewsData, APIPropValues.articles>[APIPropValues.articles]>): void;
}
