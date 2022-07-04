import { OptionsI, CallbackI } from '../interfaces/interfaces';
import { EndpointsT } from '../types/types';

export default interface LoaderI {
    getResp(o: { endpoint: EndpointsT; options?: Partial<OptionsI> }, callback: CallbackI): void;
}
