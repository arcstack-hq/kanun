import { CustomAttributes, CustomMessages, GenericObject, InitialRule, InitialRules } from '../Contracts/BaseContract';

import ErrorBag from './validators/errorBag';
import ImplicitRuleContract from './rules/implicitRuleContract';
import Lang from './lang';
import { default as PasswordRule } from './rules/password';
import RuleContract from './rules/ruleContract';
import Validator from './validator';

class Rule extends RuleContract { };
class ImplicitRule extends ImplicitRuleContract { };
class Password extends PasswordRule { };

function make (
    data: GenericObject = {},
    rules: InitialRules = {},
    customMessages: CustomMessages = {},
    customAttributes: CustomAttributes = {}
): Validator {
    return new Validator(data, rules, customMessages, customAttributes);
};

function setDefaultLang (lang: string): void {
    Lang.setDefaultLang(lang);
};

function setFallbackLang (lang: string): void {
    Lang.setFallbackLang(lang);
};

function setTranslationObject (translations: object): void {
    Lang.setTranslationObject(translations);
};

export {
    Rule,
    ImplicitRule,
    InitialRules,
    InitialRule,
    Password,
    Validator,
    ErrorBag,
    make,
    setDefaultLang,
    setFallbackLang,
    setTranslationObject,
};

export * from './rules/registerRule';
export * from './rule';



