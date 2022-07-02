import { Data } from '../types/types';

export interface Options {
    [s: string]: string;
}

export interface Callback {
    (d?: Data): void;
}
