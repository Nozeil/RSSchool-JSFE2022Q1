import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '4c060b36cda74bf08f8f56cac47ab4c2', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
