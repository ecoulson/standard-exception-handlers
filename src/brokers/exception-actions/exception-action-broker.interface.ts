import { GenericConstructor } from '@the-standard/types';
import { ExceptionHandler } from '../../models/exception-handling/exception-handler';

export interface IExceptionActionBroker {
    addAction(
        pattern: GenericConstructor<Error>,
        action: ExceptionHandler
    ): void;
    getAction(
        pattern: GenericConstructor<Error>
    ): ExceptionHandler | undefined | null;
    setDefault(action: ExceptionHandler): void;
    getDefault(): ExceptionHandler | undefined | null;
}
