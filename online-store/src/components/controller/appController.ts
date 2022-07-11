import { CallbackT } from '../../types/types';
import Loader from './loader/loader';

export default class AppController extends Loader {
  getProducts(callback: CallbackT) {
    super.loadData(callback);
  }
}
