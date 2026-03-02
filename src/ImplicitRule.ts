import IImplicitRule from './Rules/IImplicitRule'
import { ValidationRuleCallable } from './Contracts/RuleBuilder'
import type { Validator } from './Validator'

export abstract class ImplicitRule extends IImplicitRule {
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