import { Options, Callback } from '../interfaces/interfaces';
import { Endpoints } from '../types/types';

export default interface LoaderI {
    getResp(o: { endpoint: Endpoints; options?: Partial<Options> }, callback: Callback): void;
}
