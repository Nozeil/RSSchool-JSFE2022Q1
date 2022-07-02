import APIPropValues from '../enums/APIPropValues';
import { Callback } from '../interfaces/interfaces';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: Callback): void {
        super.getResp(
            {
                endpoint: APIPropValues.sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: Callback): void {
        let target: HTMLDivElement = e.target as HTMLDivElement;
        const newsContainer: HTMLDivElement = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: APIPropValues.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLDivElement;
        }
    }
}

export default AppController;
