'use strict'

import { ImplicitAttributes, InitialRule, Rules, TRule, ValidationRuleParserInterface } from '../Contracts/BaseContract'

import ClosureValidationRule from '../Rules/closureValidationRule'
import { GenericObject } from 'src/Contracts/IGeneric'
import RuleContract from '../Rules/IRuleContract'
import validationData from './validationData'

const validationRuleParser: ValidationRuleParserInterface = {
    /**
     * Convert rules to array
     * 
     * @param rules 
     * @param data 
     * @returns 
     */
    explodeRules: function (
        rules: Rules | InitialRule[],
        data: GenericObject = {}
    ): { rules: Rules, implicitAttributes: ImplicitAttributes } {

        const implicitAttributes: ImplicitAttributes = {}

        for (const key in rules) {
            if (key.indexOf('*') !== -1) {
                rules = this.explodeWildCardRules(rules, key, data, implicitAttributes)
                delete rules[key]
            }
            else if (Object.prototype.hasOwnProperty.call(rules, key) && Array.isArray(rules)) {
                rules[Number(key)] = this.explodeExplicitRules(rules[Number(key)] as TRule[])
            }
            else if (Object.prototype.hasOwnProperty.call(rules, key) && !Array.isArray(rules)) {
                rules[key] = this.explodeExplicitRules(rules[key])
            }
        }

        return {
            rules: rules as Rules, implicitAttributes
        }
    },

    /**
     * Define a set of rules that apply to each element in an array attribute.
     * 
     * @param results 
     * @param attribute 
     * @param masterData 
     * @param implicitAttributes 
     * @returns 
     */
    explodeWildCardRules: function (
        results: GenericObject,
        attribute: string,
        masterData: GenericObject,
        implicitAttributes: ImplicitAttributes
    ): Rules {
        const pattern: RegExp = new RegExp('^' + attribute.replace(/\*/g, '[^.]*') + '$')
        const data: GenericObject = validationData.initializeAndGatherData(attribute, masterData)
        const rule: string | InitialRule[] = results[attribute]

        for (const key in data) {
            if (key.slice(0, attribute.length) === attribute || key.match(pattern) !== null) {
                if (Array.isArray(implicitAttributes[attribute])) {
                    implicitAttributes[attribute].push(key)
                } else {
                    implicitAttributes[attribute] = [key]
                }
                results = this.mergeRulesForAttribute(results, key, rule)
            }
        }

        return results
    },

    /**
     * Merge additional rules into a given attribute.
     * 
     * @param results 
     * @param attribute 
     * @param rules 
     * @returns 
     */
    mergeRulesForAttribute (
        results: GenericObject,
        attribute: string,
        rules: string | InitialRule[]
    ): Rules {
        const merge = this.explodeRules([rules]).rules[0]
        results[attribute] = [...results[attribute] ? this.explodeExplicitRules(results[attribute]) : [], ...merge]

        return results
    },

    /**
     * In case the rules specified by the user are a string seperated with '|' - convert them to an array
     */
    explodeExplicitRules: function (rules: InitialRule | InitialRule[]): TRule[] {
        if (typeof rules === 'string') {
            return rules.split('|')
        }

        if (!Array.isArray(rules)) {
            return [this.prepareRule(rules)]
        }

        return rules.map((rule: InitialRule) => this.prepareRule(rule))
    },

    /**
     * Prepare the given rule for the Validator.
     */
    prepareRule (rule: InitialRule): TRule {

        if (rule instanceof RuleContract) {
            return rule
        }

        if (typeof rule === 'function') {
            return new ClosureValidationRule(rule as never)
        }

        return rule.toString()
    },

    /**
     * Extract the rule name and parameters from a rule.
     */
    parse (rule: TRule): [TRule, string[]] {
        if (rule instanceof RuleContract) {
            return [rule, []]
        }

        return this.parseStringRule(rule)
    },

    /**
     * Parse the parameters associated with a rule
     */
    parseStringRule: function (rule: string): [string, string[]] {

        let parameters: string[] = []
        let parameter: string

        if (rule.indexOf(':') !== -1) {
            [rule, parameter] = rule.split(/:(.+)/)

            parameters = parameter.split(',')
        }

        return [rule, parameters]
    },

    /**
     * Get a rule and its parameters for a given attribute.
     * 
     * @param attribute 
     * @param searchRules 
     * @param availableRules 
     * @returns 
     */
    getRule: function (
        attribute: string,
        searchRules: string | string[],
        availableRules: Rules
    ): Partial<[string, string[]]> {

        // The available rules are all the rules specified by the user, for example:
        // { name: ['required', 'string'], age: ['required', 'gt:10']}
        // A valid attribute in that case would be age
        if (!availableRules[attribute]) {
            return []
        }

        // The search rule can be either a string or an array - lets say we want check if the 'gt' rule exists for 
        // the age attrtibute - in that case the serachRules will be equal to 'gt' - In case an array is used
        // the method will return the data for the first matched rule
        searchRules = Array.isArray(searchRules) ? searchRules : [searchRules]

        for (let i = 0; i < availableRules[attribute].length; i++) {
            const [rule, parameters] = this.parse(availableRules[attribute][i])

            if (searchRules.indexOf(rule as string) !== -1) {
                // return the rule and parameters for the first match
                return [rule as never, parameters]
            }
        }

        return []
    },

    /**
     * Determine if the given attribute has a rule in the given set of available rules.
     */
    hasRule: function (attribute: string, searchRules: string | string[], availableRules: Rules): boolean {
        return this.getRule(attribute, searchRules, availableRules).length > 0
    },
}


export default validationRuleParser