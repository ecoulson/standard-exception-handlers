import { Exception } from '@the-standard/exceptions';
import { Func } from '@the-standard/types';

export type ExceptionHandler = Func<Exception, [Exception]>;
