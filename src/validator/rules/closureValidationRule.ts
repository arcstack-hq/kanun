'use strict';

import RuleContract from './ruleContract';
import { ValidationCallback } from '../../Contracts/BaseContract';

class ClosureValidationRule extends RuleContract {

    /**
     * The callback that validates the attribute
     */
    callback: Function | ValidationCallback;

    /**
     * Indicates if the validation callback failed.
     */
    failed: boolean = false;

    constructor(callback: Function | ValidationCallback) {
        super();
        this.callback = callback;
    }

    /**
     * Determine if the validation rule passes.
     */
    passes (value: any, attribute: string): boolean | Promise<boolean> {
        this.failed = false;
        const result = this.callback(value, (message) => {
            this.failed = true;
            this.message = message;
        }, attribute);

        if (result instanceof Promise) {
            return result.then(() => !this.failed);
        }

        return !this.failed;
    };

}

export default ClosureValidationRule;