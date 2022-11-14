import { Action } from '@the-standard/types';
import { ExceptionHandlingChainActions } from '../../../models/exception-handling/exception-handling-chain-actions';
import { AsyncExceptionHandlingChainActions } from '../../../models/exception-handling/async-exception-handling-chain-actions';

export interface IExceptionHandlingService<T> {
    tryCatch(func: Action<T>): ExceptionHandlingChainActions<T>;

    tryCatchAsync(
        func: Action<Promise<T>>
    ): AsyncExceptionHandlingChainActions<T>;
}
