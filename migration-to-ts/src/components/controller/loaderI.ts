import { OptionsI, CallbackI } from '../interfaces/interfaces';
import { Endpoints } from '../types/types';

export default interface LoaderI {
    getResp(o: { endpoint: Endpoints; options?: Partial<OptionsI> }, callback: CallbackI): void;
}
