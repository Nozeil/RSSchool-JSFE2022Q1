import { SourcesDrawDataT, SourcesT } from '../../types/types';
import './sources.css';
import SourcesI from './sourcesI';

class Sources implements SourcesI {
    public draw(data: SourcesDrawDataT): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        data.forEach((item: SourcesT): void => {
            const sourceClone: HTMLTemplateElement = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            (sourceClone.querySelector('.source__item-name') as HTMLDivElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLDivElement).append(fragment);
    }
}

export default Sources;
