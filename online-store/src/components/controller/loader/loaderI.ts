import { CallbackT } from '../../../types/types';

export default interface LoaderI {
  loadData: (callback: CallbackT, url: string) => Promise<void>;
}
