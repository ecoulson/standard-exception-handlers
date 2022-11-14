import { GenericConstructor, Nullable } from '@the-standard/types';
import { ExceptionHandler } from '../../models/exception-handling/exception-handler';
import { IExceptionActionBroker } from './exception-action-broker.interface';

export class ExceptionActionBroker implements IExceptionActionBroker {
    private defaultHandler: Nullable<ExceptionHandler>;
    private readonly actionMapping: Map<
        GenericConstructor<Error>,
        ExceptionHandler
    >;

    constructor() {
        this.actionMapping = new Map();
        this.defaultHandler = null;
    }

    setDefault(action: ExceptionHandler): void {
        this.defaultHandler = action;
    }

    getDefault(): Nullable<ExceptionHandler> {
        return this.defaultHandler;
    }

    addAction(pattern: GenericConstructor<Error>, action: ExceptionHandler) {
        this.actionMapping.set(pattern, action);
    }

    getAction(pattern: GenericConstructor<Error>) {
        return this.actionMapping.get(pattern);
    }
}
