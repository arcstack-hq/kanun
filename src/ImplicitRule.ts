import { ValidationRuleCallable } from './Contracts/RuleBuilder'
import type { Validator } from './Validator'
import { ImplicitRule as Rule } from './validator/Core'

export abstract class ImplicitRule extends Rule {
    rules: ValidationRuleCallable[] = []

    /**
     * Run the validation rule.
     */
    abstract validate (attribute: string, value: any, fail: (msg: string) => any): void
    /**
     * Set the current validator.
     */
    public setValidator?(validator: Validator<any, any>): this
}