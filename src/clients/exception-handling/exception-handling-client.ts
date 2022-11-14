import { ExceptionActionBroker } from '../../brokers/exception-actions/exception-action-broker';
import { ExceptionHandlingChainActions } from '../../models/exception-handling/exception-handling-chain-actions';
import { AsyncExceptionHandlingChainActions } from '../../models/exception-handling/async-exception-handling-chain-actions';
import { ExceptionHandlingService } from '../../services/foundations/exception-handling/exception-handling-service';
import { IExceptionHandlingClient } from './exception-handling-client.interface';
import { Action } from '@the-standard/types';

export class ExceptionHandlingClient<T> implements IExceptionHandlingClient<T> {
    private readonly service: ExceptionHandlingService<T>;

    constructor() {
        this.service = new ExceptionHandlingService<T>(
            new ExceptionActionBroker()
        );
    }

    tryCatch(func: Action<T>): ExceptionHandlingChainActions<T> {
        return this.service.tryCatch(func);
    }

    tryCatchAsync(
        func: Action<Promise<T>>
    ): AsyncExceptionHandlingChainActions<T> {
        return this.service.tryCatchAsync(func);
    }
}
