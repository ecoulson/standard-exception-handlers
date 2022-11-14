import { ExceptionHandlingChainActions } from '../../models/exception-handling/exception-handling-chain-actions';
import { AsyncExceptionHandlingChainActions } from '../../models/exception-handling/async-exception-handling-chain-actions';
import { Action } from '@the-standard/types';

export interface IExceptionHandlingClient<T> {
    tryCatch(func: Action<T>): ExceptionHandlingChainActions<T>;

    tryCatchAsync(
        func: Action<Promise<T>>
    ): AsyncExceptionHandlingChainActions<T>;
}
