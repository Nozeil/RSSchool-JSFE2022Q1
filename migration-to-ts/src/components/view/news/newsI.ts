import { NewsDataI } from '../../interfaces/interfaces';
import { APIPropValues } from '../../enums/enums';

export default interface NewsI {
    draw(data: Readonly<Pick<NewsDataI, APIPropValues.articles>[APIPropValues.articles]>): void;
}
