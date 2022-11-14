import { Action, GenericConstructor } from '@the-standard/types';
import { Exception } from '@the-standard/exceptions';
import { NullExceptionActionException } from '../../../models/exception-handling/exceptions/null-exception-action-exception';
import { NullExceptionPatternList } from '../../../models/exception-handling/exceptions/null-exception-pattern-list';
import { NullFunctionException } from '../../../models/exception-handling/exceptions/null-function-exception';
import { ExceptionHandlingServiceException } from './exceptions/exception-handling-service-exception';
import { ExceptionHandlingValidationException } from './exceptions/exception-handling-validation-exception';
import { FailedExceptionActionStorageException } from './exceptions/failed-exception-action-storage-exception';

export class ExceptionHandlingServiceExceptions {
    protected tryCatchExceptionHandler<T>(func: Action<T>) {
        try {
            return func();
        } catch (error) {
            const exception = Exception.fromError(error);
            const exceptionConstructor =
                exception.constructor as GenericConstructor<Exception>;
            switch (exceptionConstructor) {
                case NullFunctionException:
                    throw new ExceptionHandlingValidationException(exception);
                default:
                    throw this.createFailedActionStorageException(exception);
            }
        }
    }

    private createFailedActionStorageException(exception: Exception) {
        const failedException = new FailedExceptionActionStorageException(
            exception
        );
        throw new ExceptionHandlingServiceException(failedException);
    }

    protected handleCatchExceptionHandler<T>(func: Action<T>) {
        try {
            return func();
        } catch (error) {
            const exception = Exception.fromError(error);
            const exceptionConstructor =
                exception.constructor as GenericConstructor<Exception>;
            switch (exceptionConstructor) {
                case NullExceptionPatternList:
                case NullExceptionActionException:
                    throw new ExceptionHandlingValidationException(exception);
                default:
                    throw this.createFailedActionStorageException(exception);
            }
        }
    }

    protected wrapExceptionsExceptionHandler<T>(func: Action<T>) {
        try {
            return func();
        } catch (error) {
            const exception = Exception.fromError(error);
            throw this.createFailedActionStorageException(exception);
        }
    }

    protected handleDefaultExceptionHandler<T>(func: Action<T>) {
        try {
            return func();
        } catch (error) {
            const exception = Exception.fromError(error);
            const exceptionConstructor =
                exception.constructor as GenericConstructor<Exception>;
            switch (exceptionConstructor) {
                case NullExceptionActionException:
                    throw new ExceptionHandlingValidationException(exception);
                default:
                    throw this.createFailedActionStorageException(exception);
            }
        }
    }
}
