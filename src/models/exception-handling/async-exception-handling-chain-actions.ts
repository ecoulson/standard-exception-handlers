import { Action } from '@the-standard/types';
import { CatchHandler } from './catch-handler';
import { DefaultHandler } from './default-handler';

export class AsyncExceptionHandlingChainActions<T> {
    constructor(
        public readonly handle: CatchHandler<Promise<T>>,
        public readonly execute: Action<Promise<T>>,
        public readonly catchAll: DefaultHandler<Promise<T>>
    ) {}
}
