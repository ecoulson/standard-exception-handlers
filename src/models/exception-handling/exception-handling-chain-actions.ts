import { Action } from '@the-standard/types';
import { CatchHandler } from './catch-handler';
import { DefaultHandler } from './default-handler';

export class ExceptionHandlingChainActions<T> {
    constructor(
        public readonly handle: CatchHandler<T>,
        public readonly execute: Action<T>,
        public readonly catchAll: DefaultHandler<T>
    ) {}
}
