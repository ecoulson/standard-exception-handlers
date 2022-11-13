import { Exception } from '@the-standard/exceptions';

export type ExceptionAction = (exception: Exception) => Exception;
