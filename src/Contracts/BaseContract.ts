'use strict'

import BaseRule from '../validator/rules/baseRule'
import RuleContract from '../validator/rules/ruleContract'
import replaceAttributePayload from '../validator/payloads/replaceAttributePayload'

export interface GenericObject {
    [key: string]: any
};

export interface GenericCallable {
    (...args: any[]): any
};

export type InitialRule = string | ValidationCallback | RuleContract | BaseRule;

export type Rule = string | RuleContract;

export interface InitialRules extends GenericObject {
    [key: string]: InitialRule | InitialRule[]
};

export interface Rules extends GenericObject {
    [key: string]: Rule[]
};

export interface ImplicitAttributes {
    [key: string]: string[]
}

export type CustomMessages = GenericObject & {};

export type CustomAttributes = GenericObject & {};

export interface ErrorMessage {
    error_type?: string,
    message: string,
};

export interface Errors {
    [key: string]: ErrorMessage[]
};

export interface Messages {
    [key: string]: string[]
};

export interface CustomErrors {
    [key: string]: string | string[]
};

export interface ValidationRuleParserInterface {
    /**
     * Convert rules to array
     * 
     * @param rules 
     * @param data 
     * @returns 
     */
    explodeRules: (
        rules: Rules | InitialRule[],
        data?: GenericObject
    ) => { rules: Rules, implicitAttributes: ImplicitAttributes };

    /**
     * Define a set of rules that apply to each element in an array attribute.
     * 
     * @param results 
     * @param attribute 
     * @param data 
     * @param implicitAttributes 
     * @returns 
     */
    explodeWildCardRules: (
        results: GenericObject,
        attribute: string,
        data: GenericObject,
        implicitAttributes: ImplicitAttributes
    ) => GenericObject;

    /**
     * Explode rules that are in string format into array format.
     * 
     * @param rule 
     * @returns 
     */
    explodeExplicitRules: (
        rule: string | InitialRule[]
    ) => Rule[];

    /**
     * Prepare the given rule for validation.
     * 
     * @param rule 
     * @returns 
     */
    prepareRule: (rule: InitialRule) => Rule;

    /**
     * Merge the given rules with any existing rules for the attribute.
     * 
     * @param results 
     * @param attribute 
     * @param rules 
     * @returns 
     */
    mergeRulesForAttribute: (
        results: GenericObject,
        attribute: string,
        rules: string | InitialRule[]
    ) => GenericObject;

    /**
     * Parse a rule into its name and parameters.
     * 
     * @param rule 
     * @returns 
     */
    parse: (rule: Rule) => [Rule, string[]];

    /**
     * Parse a string rule into its name and parameters.
     * 
     * @param rule 
     * @returns 
     */
    parseStringRule: (rule: string) => [string, string[]];

    /**
     * Get a specific rule from the ruleset for an attribute.
     * 
     * @param attribute 
     * @param searchRules 
     * @param availableRules 
     * @returns 
     */
    getRule: (
        attribute: string,
        searchRules: string | string[],
        availableRules: Rules
    ) => Partial<[string, string[]]>;

    /**
     * Determine if a rule exists in the ruleset for an attribute.
     * 
     * @param attribute 
     * @param searchRules 
     * @param availableRules 
     * @returns 
     */
    hasRule: (
        attribute: string,
        searchRules: string | string[],
        availableRules: Rules
    ) => boolean;
};

export interface ValidationDataInterface {
    initializeAndGatherData: (attribute: string, masterData: object) => object;
    initializeAttributeOnData: (attribute: string, masterData: object) => object;
    extractValuesFromWildCards: (masterData: object, data: object, attribute: string) => object;
    getLeadingExplicitAttributePath: (attribute: string) => string;
    extractDataFromPath: (path: string, masterData: object) => object;
};

export interface ReplaceAttributeInterface {
    replaceAcceptedIf: (payload: replaceAttributePayload) => string;
    replaceBefore: (payload: replaceAttributePayload) => string;
    replaceBeforeOrEqual: (payload: replaceAttributePayload) => string;
    replaceAfter: (payload: replaceAttributePayload) => string;
    replaceAfterOrEqual: (payload: replaceAttributePayload) => string;
    replaceBetween: (payload: replaceAttributePayload) => string;
    replaceDateEquals: (payload: replaceAttributePayload) => string;
    replaceDeclinedIf: (payload: replaceAttributePayload) => string;
    replaceDigits: (payload: replaceAttributePayload) => string;
    replaceDigitsBetween: (payload: replaceAttributePayload) => string;
    replaceDifferent: (payload: replaceAttributePayload) => string;
    replaceEndsWith: (payload: replaceAttributePayload) => string;
    replaceIn: (payload: replaceAttributePayload) => string;
    replaceMin: (payload: replaceAttributePayload) => string;
    replaceMax: (payload: replaceAttributePayload) => string;
    replaceRequiredWith: (payload: replaceAttributePayload) => string;
    replaceRequiredWithAll: (payload: replaceAttributePayload) => string;
    replaceRequiredWithout: (payload: replaceAttributePayload) => string;
    replaceRequiredWithoutAll: (payload: replaceAttributePayload) => string;
    replaceGt: (payload: replaceAttributePayload) => string;
    replaceLt: (payload: replaceAttributePayload) => string;
    replaceGte: (payload: replaceAttributePayload) => string;
    replaceLte: (payload: replaceAttributePayload) => string;
    replaceRequiredIf: (payload: replaceAttributePayload) => string;
    replaceStartsWith: (payload: replaceAttributePayload) => string;
    replaceRequiredUnless: (payload: replaceAttributePayload) => string;
    replaceSame: (payload: replaceAttributePayload) => string;
    replaceSize: (payload: replaceAttributePayload) => string;
};


export interface LangInterface {
    defaultLang: string;
    fallbackLang: string;
    existingLangs: string[];
    translations: GenericObject;
    messages: GenericObject;
    defaultMessages: GenericObject;
    fallbackMessages: GenericObject;
    get: (lang: string) => GenericObject;
    setTranslationObject: (translations: GenericObject) => void;
    setDefaultLang: (lang: string) => void;
    setFallbackLang: (lang: string) => void;
    getDefaultLang: () => string;
    load: (lang: string) => void;
};

export type ValidationCallback = (
    value: any,
    fail: (message: string) => void,
    attribute: string
) => void;