import { Exception } from '@the-standard/exceptions';

export class NullExceptionActionException extends Exception {
    constructor() {
        super('Null exception action.');
    }
}
