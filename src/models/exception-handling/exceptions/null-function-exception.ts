import { Exception } from '@the-standard/exceptions';

export class NullFunctionException extends Exception {
    constructor() {
        super('Function is null.');
    }
}
