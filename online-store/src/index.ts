import './products.json';

function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map(r);
}

importAll(require.context('./assets/jpg', false, /\.jpg$/));

import './scss/main.scss';
import App from './components/app/app';

const app = new App();
app.start();