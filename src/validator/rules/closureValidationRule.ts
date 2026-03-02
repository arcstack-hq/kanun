'use strict'

import { GenericCallable, ValidationCallback } from '../../Contracts/BaseContract'

import RuleContract from './ruleContract'

class ClosureValidationRule extends RuleContract {

    /**
     * The callback that validates the attribute
     */
    callback: GenericCallable | ValidationCallback

    /**
     * Indicates if the validation callback failed.
     */
    failed: boolean = false

    constructor(callback: GenericCallable | ValidationCallback) {
        super()
        this.callback = callback
    }

    /**
     * Determine if the validation rule passes.
     */
    passes (value: any, attribute: string): boolean | Promise<boolean> {
        this.failed = false
        const result = this.callback(value, (message) => {
            this.failed = true
            this.message = message
        }, attribute)

        if (result instanceof Promise) {
            return result.then(() => !this.failed)
        }

        return !this.failed
    };

}

export default ClosureValidationRule