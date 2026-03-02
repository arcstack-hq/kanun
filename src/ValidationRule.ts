import { IValidationRule } from './Contracts/IValidationRule'
import RuleContract from './Rules/IRuleContract'
import { RulesForData } from './Contracts/ValidatorContracts'
import { ValidationRuleCallable } from './Contracts/RuleBuilder'
import type { Validator } from './Validator'

export abstract class ValidationRule<
    D extends Record<string, any> = any,
    R extends RulesForData<D> = any
> extends RuleContract implements IValidationRule {
    rules: ValidationRuleCallable[] = []
    private passing: boolean = false

    /**
     * Run the validation rule.
     */
    abstract validate (attribute: string, value: any, fail: (msg: string) => any): void
    /**
     * Set the current validator.
     */
    public setValidator?(validator: Validator<D, R>): this
    /**
     * Set the data under validation.
     */
    public setData (_data: Record<string, any>): this { return this }

    passes (value: any, attribute: string): boolean | Promise<boolean> {
        this.passing = true
        this.validate(attribute, value, (message: string) => {
            this.message = message
            this.passing = false
        })
        return this.passing
    }
}