import {
    anyFunction,
    anything,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Exception } from '@the-standard/exceptions';
import { ExceptionActionBroker } from '../../../../src/brokers/exception-actions/exception-action-broker';
import { ExceptionHandlingService } from '../../../../src/services/foundations/exception-handling/exception-handling-service';
import { ExceptionHandlingServiceException } from '../../../../src/services/foundations/exception-handling/exceptions/exception-handling-service-exception';
import { FailedExceptionActionStorageException } from '../../../../src/services/foundations/exception-handling/exceptions/failed-exception-action-storage-exception';

describe('Exception Handling Service Exceptions Test Suite', () => {
    const mockedExceptionActionBroker = mock(ExceptionActionBroker);
    const service = new ExceptionHandlingService(
        instance(mockedExceptionActionBroker)
    );

    beforeEach(() => {
        reset(mockedExceptionActionBroker);
    });

    describe('tryCatch', () => {
        test('Should throw a service exception when adding an action throws an exception', () => {
            const inputFunction = () => {
                return;
            };
            const innerError = new Error('Failed to add action');
            const innerException = Exception.fromError(innerError);
            const failedException = new FailedExceptionActionStorageException(
                innerException
            );
            const defaultAction = () => new Exception();
            const expectedException = new ExceptionHandlingServiceException(
                failedException
            );
            when(
                mockedExceptionActionBroker.addAction(Exception, anyFunction())
            ).thenThrow(innerError);

            const action = () =>
                service
                    .tryCatch(inputFunction)
                    .handle([Exception], defaultAction);
            expect(action).toThrowException(expectedException);

            verify(
                mockedExceptionActionBroker.addAction(anything(), anyFunction())
            ).once();
        });

        test('Should throw a service exception when getting an action throws an exception', () => {
            const inputFunction = () => {
                throw new Error();
            };
            const innerError = new Error('Failed to get action');
            const innerException = Exception.fromError(innerError);
            const failedException = new FailedExceptionActionStorageException(
                innerException
            );
            const expectedException = new ExceptionHandlingServiceException(
                failedException
            );
            when(mockedExceptionActionBroker.getAction(Error)).thenThrow(
                innerError
            );

            const action = () => service.tryCatch(inputFunction).execute();
            expect(action).toThrowException(expectedException);

            verify(mockedExceptionActionBroker.getAction(anything())).once();
        });

        test('Should throw a service exception when getting the default throws an exception', () => {
            const inputFunction = () => {
                throw new Error();
            };
            const innerError = new Error('Failed to get default');
            const innerException = Exception.fromError(innerError);
            const failedException = new FailedExceptionActionStorageException(
                innerException
            );
            const expectedException = new ExceptionHandlingServiceException(
                failedException
            );
            when(mockedExceptionActionBroker.getAction(Exception)).thenReturn(
                () => new Exception()
            );
            when(mockedExceptionActionBroker.getDefault()).thenThrow(
                innerError
            );

            const action = () => service.tryCatch(inputFunction).execute();
            expect(action).toThrowException(expectedException);

            verify(mockedExceptionActionBroker.getAction(anyFunction())).once();
            verify(mockedExceptionActionBroker.getDefault()).once();
        });

        test('Should throw a service exception when setting the default throws an exception', () => {
            const inputFunction = () => {
                throw new Error();
            };
            const innerError = new Error('Failed to get default');
            const innerException = Exception.fromError(innerError);
            const failedException = new FailedExceptionActionStorageException(
                innerException
            );
            const expectedException = new ExceptionHandlingServiceException(
                failedException
            );
            when(
                mockedExceptionActionBroker.setDefault(anyFunction())
            ).thenThrow(innerError);

            const action = () =>
                service.tryCatch(inputFunction).catchAll(() => new Exception());
            expect(action).toThrowException(expectedException);

            verify(
                mockedExceptionActionBroker.setDefault(anyFunction())
            ).once();
        });
    });

    describe('tryCatchAsync', () => {
        test('Should throw a service exception when adding an action throws an exception', async () => {
            const inputFunction = async () => Promise.resolve();
            const innerError = new Exception('Failed to add action');
            const innerException = Exception.fromError(innerError);
            const failedException = new FailedExceptionActionStorageException(
                innerException
            );
            const defaultAction = () => new Exception();
            const expectedException = new ExceptionHandlingServiceException(
                failedException
            );
            when(
                mockedExceptionActionBroker.addAction(Exception, anyFunction())
            ).thenThrow(innerError);

            const action = () =>
                service
                    .tryCatchAsync(inputFunction)
                    .handle([Exception], defaultAction);
            expect(action).toThrowException(expectedException);

            verify(
                mockedExceptionActionBroker.addAction(anything(), anyFunction())
            ).once();
        });

        test('Should throw a service exception when getting an action throws an exception', async () => {
            const inputFunction = async () => {
                throw new Error();
            };
            const innerError = new Error('Failed to get action');
            const innerException = Exception.fromError(innerError);
            const failedException = new FailedExceptionActionStorageException(
                innerException
            );
            const expectedException = new ExceptionHandlingServiceException(
                failedException
            );
            when(mockedExceptionActionBroker.getAction(Error)).thenThrow(
                innerError
            );

            const action = () => service.tryCatchAsync(inputFunction).execute();
            await expect(action).toThrowExceptionAsync(expectedException);

            verify(mockedExceptionActionBroker.getAction(anything())).once();
        });

        test('Should throw a service exception when getting the default throws an exception', async () => {
            const inputFunction = async () => {
                throw new Error();
            };
            const innerError = new Error('Failed to get default');
            const innerException = Exception.fromError(innerError);
            const failedException = new FailedExceptionActionStorageException(
                innerException
            );
            const expectedException = new ExceptionHandlingServiceException(
                failedException
            );
            when(mockedExceptionActionBroker.getAction(Exception)).thenReturn(
                () => new Exception()
            );
            when(mockedExceptionActionBroker.getDefault()).thenThrow(
                innerError
            );

            const action = () => service.tryCatchAsync(inputFunction).execute();
            await expect(action).toThrowExceptionAsync(expectedException);

            verify(mockedExceptionActionBroker.getAction(anything())).once();
            verify(mockedExceptionActionBroker.getDefault()).once();
        });

        test('Should throw a service exception when setting the default throws an exception', async () => {
            const inputFunction = async () => {
                throw new Error();
            };
            const innerError = new Error('Failed to get default');
            const innerException = Exception.fromError(innerError);
            const failedException = new FailedExceptionActionStorageException(
                innerException
            );
            const expectedException = new ExceptionHandlingServiceException(
                failedException
            );
            when(
                mockedExceptionActionBroker.setDefault(anyFunction())
            ).thenThrow(innerError);

            const action = () =>
                service
                    .tryCatchAsync(inputFunction)
                    .catchAll(() => new Exception());
            await expect(action).toThrowExceptionAsync(expectedException);

            verify(
                mockedExceptionActionBroker.setDefault(anyFunction())
            ).once();
        });
    });
});
