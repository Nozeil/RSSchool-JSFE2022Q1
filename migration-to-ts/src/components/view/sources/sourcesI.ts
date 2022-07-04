import { APIPropValues } from '../../enums/enums';
import { SourcesDataI } from '../../interfaces/interfaces';

export default interface SourcesI {
    draw(data: Readonly<Pick<SourcesDataI, APIPropValues.sources>[APIPropValues.sources]>): void;
}
