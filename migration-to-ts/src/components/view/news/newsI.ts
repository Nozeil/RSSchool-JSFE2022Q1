import { NewsData } from '../../interfaces/interfaces';
import { APIPropValues } from '../../enums/enums';

export default interface NewsI {
    draw(data: Readonly<Pick<NewsData, APIPropValues.articles>[APIPropValues.articles]>): void;
}
