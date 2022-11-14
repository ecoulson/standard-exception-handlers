import { Exception } from '@the-standard/exceptions';
import { ExceptionActionBroker } from '../../../brokers/exception-actions/exception-action-broker';
import { ExceptionHandler } from '../../../models/exception-handling/exception-handler';
import { ExceptionHandlingChainActions } from '../../../models/exception-handling/exception-handling-chain-actions';
import { AsyncExceptionHandlingChainActions } from '../../../models/exception-handling/async-exception-handling-chain-actions';
import { ExceptionHandlingServiceExceptions } from './exception-handling-service.exceptions';
import { ExceptionHandlingServiceValidations } from './exception-handling-service.validations';
import { JoinPartialGenericClasses } from '@the-standard/partials';

interface IExceptionHandlingServiceOperations<T>
    extends ExceptionHandlingServiceExceptions,
        ExceptionHandlingServiceValidations<T> {}

type ExceptionHandlingServiceOperationsConstructor = new <T>(
    ...args: any[]
) => IExceptionHandlingServiceOperations<T>;

export class ExceptionHandlingServiceOperations<
    T
> extends JoinPartialGenericClasses<ExceptionHandlingServiceOperationsConstructor>(
    ExceptionHandlingServiceExceptions,
    ExceptionHandlingServiceValidations
)<T> {
    constructor(protected readonly broker: ExceptionActionBroker) {
        super();
    }
}
