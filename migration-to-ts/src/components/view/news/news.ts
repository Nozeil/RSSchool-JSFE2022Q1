import APIPropValues from '../../enums/APIPropValues';
import NewsData from '../../interfaces/newsData';
import { Articles } from '../../types/newsDataArticles';
import './news.css';

class News {
    public draw(data: NewsData[APIPropValues.articles]): void {
        const news: NewsData[APIPropValues.articles] =
            data.length >= 10 ? data.filter((_item: Articles, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: Articles, idx: number): void => {
            const newsClone: HTMLTemplateElement = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (idx % 2) {
                const newsItem: HTMLDivElement = newsClone.querySelector('.news__item') as HTMLDivElement;
                newsItem.classList.add('alt');
            }

            (newsClone.querySelector('.news__meta-photo') as HTMLDivElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
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
