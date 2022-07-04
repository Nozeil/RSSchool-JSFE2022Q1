import { NewsDrawDataT } from '../../types/types';

export default interface NewsI {
    draw(data: NewsDrawDataT): void;
}
