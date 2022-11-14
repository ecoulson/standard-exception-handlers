import { isNil } from '@the-standard/conditions';
import { Action, GenericConstructor } from '@the-standard/types';
import { ExceptionHandler } from '../../../models/exception-handling/exception-handler';
import { NullExceptionActionException } from '../../../models/exception-handling/exceptions/null-exception-action-exception';
import { NullExceptionPatternList } from '../../../models/exception-handling/exceptions/null-exception-pattern-list';
import { NullFunctionException } from '../../../models/exception-handling/exceptions/null-function-exception';

export class ExceptionHandlingServiceValidations<T> {
    validateFunction(func: Action<T> | Action<Promise<T>>) {
        if (isNil(func)) {
            throw new NullFunctionException();
        }
    }

    validateErrorPatterns(errorPatternList: GenericConstructor<Error>[]) {
        if (isNil(errorPatternList)) {
            throw new NullExceptionPatternList();
        }
    }

    validateExceptionAction(action: ExceptionHandler) {
        if (isNil(action)) {
            throw new NullExceptionActionException();
        }
    }
}
