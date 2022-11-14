import { Func } from '@the-standard/types';
import { ExceptionHandler } from './exception-handler';
import { ExceptionHandlingChainActions } from './exception-handling-chain-actions';

export type DefaultHandler<T> = Func<
    ExceptionHandlingChainActions<T>,
    [ExceptionHandler]
>;
