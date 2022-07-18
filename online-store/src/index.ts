import './products.json';

function importAll(r: __WebpackModuleApi.RequireContext): unknown[] {
  return r.keys().map(r);
}

importAll(require.context('./assets/jpg', false, /\.jpg$/));

import './scss/main.scss';
import App from './components/app/app';

const app: App = new App();
app.start();
