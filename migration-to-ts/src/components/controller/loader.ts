import { CallbackI, OptionsI } from '../interfaces/interfaces';
import { DataT, EndpointsT } from '../types/types';
import LoaderI from './loaderI';
import { Errors } from '../enums/enums';

class Loader implements LoaderI {
    private baseLink: string;
    private options: OptionsI;

    constructor(baseLink: string, options: OptionsI) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: EndpointsT; options?: Partial<OptionsI> },
        callback: CallbackI = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler<T extends Response>(res: T): T {
        if (!res.ok) {
            if (res.status === Errors.unauthorized || res.status === Errors.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Readonly<OptionsI>, endpoint: Readonly<EndpointsT>): string {
        const urlOptions: OptionsI = { ...this.options, ...options };
        let url: string = this.baseLink + endpoint + '?';

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: Readonly<EndpointsT>, callback: CallbackI, options: OptionsI = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then(<T extends Response>(res: T): Promise<DataT> => res.json())
            .then((data: DataT): void => callback(data))
            .catch(<T extends Error>(err: T): void => console.error(err));
    }
}

export default Loader;
