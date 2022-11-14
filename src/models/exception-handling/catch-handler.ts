import { Func, GenericConstructor } from '@the-standard/types';
import { ExceptionHandler } from './exception-handler';
import { ExceptionHandlingChainActions } from './exception-handling-chain-actions';

export type CatchHandler<T> = Func<
    ExceptionHandlingChainActions<T>,
    [GenericConstructor<Error>[], ExceptionHandler]
>;
