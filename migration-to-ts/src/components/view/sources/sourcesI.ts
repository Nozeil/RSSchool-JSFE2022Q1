import { SourcesDrawDataT } from '../../types/types';

export default interface SourcesI {
    draw(data: SourcesDrawDataT): void;
}
