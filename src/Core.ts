import type { CustomAttributes, CustomMessages, InitialRule, InitialRules } from './Contracts/BaseContract'

import BaseValidator from './BaseValidator'
import ErrorBag from './validators/errorBag'
import { GenericObject } from 'src/Contracts/IGeneric'
import { default as PasswordRule } from './Rules/password'

export class Password extends PasswordRule { };

export function make (
    data: GenericObject = {},
    rules: InitialRules = {},
    customMessages: CustomMessages = {},
    customAttributes: CustomAttributes = {}
): BaseValidator {
    return new BaseValidator(data, rules, customMessages, customAttributes)
};

export {
    InitialRules,
    InitialRule,
    ErrorBag,
}

export * from './Rules/registerRule'
export * from './rule'



