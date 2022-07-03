import { APIPropValues } from '../../enums/enums';
import { SourcesData } from '../../interfaces/interfaces';

export default interface SourcesI {
    draw(data: Readonly<Pick<SourcesData, APIPropValues.sources>[APIPropValues.sources]>): void;
}
