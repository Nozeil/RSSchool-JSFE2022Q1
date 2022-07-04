import NewsI from './newsI';
import { ArticlesT, NewsDrawDataT } from '../../types/types';
import newsPlaceholder from '../../../assets/img/news_placeholder.jpg';
import './news.css';

class News implements NewsI {
    public draw(data: NewsDrawDataT): void {
        const news: NewsDrawDataT =
            data.length >= 10 ? data.filter((_item: ArticlesT, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: ArticlesT, idx: number): void => {
            const newsClone: HTMLTemplateElement = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (idx % 2) {
                const newsItem: HTMLDivElement = newsClone.querySelector('.news__item') as HTMLDivElement;
                newsItem.classList.add('alt');
            }

            (newsClone.querySelector('.news__meta-photo') as HTMLDivElement).style.backgroundImage = `url(${
                item.urlToImage || newsPlaceholder
            })`;
            (newsClone.querySelector('.news__meta-author') as HTMLLIElement).textContent =
                item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLLIElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as HTMLHeadingElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLHeadingElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as HTMLParagraphElement).textContent =
                item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLAnchorElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement: HTMLDivElement = document.querySelector('.news') as HTMLDivElement;
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
