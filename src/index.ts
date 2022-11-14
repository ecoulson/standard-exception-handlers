import { Action } from '@the-standard/types';
import { ExceptionHandlingClient } from './clients/exception-handling/exception-handling-client';

export function tryCatch<T>(func: Action<T>) {
    const client = new ExceptionHandlingClient<T>();
    return client.tryCatch(func);
}

export function tryCatchAsync<T>(func: Action<Promise<T>>) {
    const client = new ExceptionHandlingClient<T>();
    return client.tryCatchAsync(func);
}
