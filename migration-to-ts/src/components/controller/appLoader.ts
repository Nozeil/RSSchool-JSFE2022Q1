import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '4c060b36cda74bf08f8f56cac47ab4c2', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
