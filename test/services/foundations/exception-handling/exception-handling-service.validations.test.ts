import {
    anyFunction,
    anything,
    instance,
    mock,
    reset,
    verify,
} from 'ts-mockito';
import { Exception } from '@the-standard/exceptions';
import { ExceptionActionBroker } from '../../../../src/brokers/exception-actions/exception-action-broker';
import { NullExceptionActionException } from '../../../../src/models/exception-handling/exceptions/null-exception-action-exception';
import { NullExceptionPatternList } from '../../../../src/models/exception-handling/exceptions/null-exception-pattern-list';
import { NullFunctionException } from '../../../../src/models/exception-handling/exceptions/null-function-exception';
import { ExceptionHandlingService } from '../../../../src/services/foundations/exception-handling/exception-handling-service';
import { ExceptionHandlingValidationException } from '../../../../src/services/foundations/exception-handling/exceptions/exception-handling-validation-exception';

describe('Exception Handling Service Validations Test Suite', () => {
    const mockedExceptionActionBroker = mock(ExceptionActionBroker);
    const service = new ExceptionHandlingService(
        instance(mockedExceptionActionBroker)
    );

    beforeEach(() => {
        reset(mockedExceptionActionBroker);
    });

    describe('tryCatch', () => {
        test('Should throw a validation exception when a null function is provided', () => {
            const inputFunction = null as any;
            const nullException = new NullFunctionException();
            const expectedException = new ExceptionHandlingValidationException(
                nullException
            );

            const action = () => service.tryCatch(inputFunction).execute();
            expect(action).toThrowException(expectedException);

            verify(mockedExceptionActionBroker.getAction(anything())).never();
        });

        test('Should throw a validation exception when a null pattern is provided', () => {
            const inputFunction = () => {};
            const nullException = new NullExceptionPatternList();
            const inputPatterns = null as any;
            const defaultAction = () => new Exception();
            const expectedException = new ExceptionHandlingValidationException(
                nullException
            );

            const action = () =>
                service
                    .tryCatch(inputFunction)
                    .handle(inputPatterns, defaultAction);
            expect(action).toThrowException(expectedException);

            verify(
                mockedExceptionActionBroker.addAction(anything(), anyFunction())
            ).never();
        });

        test('Should throw a validation exception when a null action is provided to handle', () => {
            const inputFunction = () => {};
            const nullException = new NullExceptionActionException();
            const defaultAction = null as any;
            const expectedException = new ExceptionHandlingValidationException(
                nullException
            );

            const action = () =>
                service.tryCatch(inputFunction).handle([], defaultAction);
            expect(action).toThrowException(expectedException);

            verify(
                mockedExceptionActionBroker.addAction(anything(), anyFunction())
            ).never();
        });

        test('Should throw a validation exception when a null action is provided to catchAll', () => {
            const inputFunction = () => {};
            const nullException = new NullExceptionActionException();
            const defaultAction = null as any;
            const expectedException = new ExceptionHandlingValidationException(
                nullException
            );

            const action = () =>
                service.tryCatch(inputFunction).catchAll(defaultAction);
            expect(action).toThrowException(expectedException);

            verify(
                mockedExceptionActionBroker.addAction(anything(), anyFunction())
            ).never();
        });
    });

    describe('tryCatchAsync', () => {
        test('Should throw a validation exception when the function is null', () => {
            const nullException = new NullFunctionException();
            const expectedException = new ExceptionHandlingValidationException(
                nullException
            );
            const inputFunction = null as any;

            const action = () => service.tryCatchAsync(inputFunction);
            expect(action).toThrowException(expectedException);

            verify(mockedExceptionActionBroker.getAction(anything())).never();
            verify(
                mockedExceptionActionBroker.addAction(anything(), anyFunction())
            ).never();
        });

        test('Should throw a validation exception when a null pattern is provided', async () => {
            const inputFunction = async () => {};
            const nullException = new NullExceptionPatternList();
            const inputPatterns = null as any;
            const defaultAction = () => new Exception();
            const expectedException = new ExceptionHandlingValidationException(
                nullException
            );

            const action = () =>
                service
                    .tryCatchAsync(inputFunction)
                    .handle(inputPatterns, defaultAction);
            expect(action).toThrowException(expectedException);

            verify(
                mockedExceptionActionBroker.addAction(anything(), anyFunction())
            ).never();
        });

        test('Should throw a validation exception when a null action is provided', () => {
            const inputFunction = async () => {};
            const nullException = new NullExceptionActionException();
            const defaultAction = null as any;
            const expectedException = new ExceptionHandlingValidationException(
                nullException
            );

            const action = () =>
                service.tryCatchAsync(inputFunction).handle([], defaultAction);
            expect(action).toThrowException(expectedException);

            verify(
                mockedExceptionActionBroker.addAction(anything(), anyFunction())
            ).never();
        });

        test('Should throw a validation exception when a null action is provided to catchAll', () => {
            const inputFunction = async () => {};
            const nullException = new NullExceptionActionException();
            const defaultAction = null as any;
            const expectedException = new ExceptionHandlingValidationException(
                nullException
            );

            const action = () =>
                service.tryCatchAsync(inputFunction).catchAll(defaultAction);
            expect(action).toThrowException(expectedException);

            verify(
                mockedExceptionActionBroker.addAction(anything(), anyFunction())
            ).never();
        });
    });
});
