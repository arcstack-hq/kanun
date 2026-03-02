import type In from '../Rules/in'
import type NotIn from '../Rules/notIn'
import type Regex from '../Rules/regex'
import type RequiredIf from '../Rules/requiredIf'
import RuleContract from 'src/Rules/IRuleContract'

export type ParamableValidationRuleName =
    | 'accepted_if'
    | 'after'
    | 'after_or_equal'
    | 'before'
    | 'before_or_equal'
    | 'between'
    | 'date_equals'
    | 'datetime'
    | 'declined_if'
    | 'digits_between'
    | 'different'
    | 'exists'
    | 'ends_with'
    | 'gt'
    | 'gte'
    | 'in'
    | 'includes'
    | 'lt'
    | 'lte'
    | 'max'
    | 'min'
    | 'not_in'
    | 'not_includes'
    | 'required_if'
    | 'required_unless'
    | 'required_with'
    | 'required_with_all'
    | 'required_without'
    | 'required_without_all'
    | 'same'
    | 'size'
    | 'starts_with'
    | 'unique'

export type PlainRuleName =
    | 'accepted'
    | 'alpha'
    | 'alpha_dash'
    | 'alpha_num'
    | 'array'
    | 'array_unique'
    | 'bail'
    | 'boolean'
    | 'confirmed'
    | 'date'
    | 'declined'
    | 'digits'
    | 'email'
    | 'integer'
    | 'json'
    | 'not_regex'
    | 'nullable'
    | 'numeric'
    | 'object'
    | 'present'
    | 'regex'
    | 'required'
    | 'sometimes'
    | 'string'
    | 'url'
    | 'hex'
    | 'uuid'

export type ValidationRuleName = ParamableValidationRuleName | PlainRuleName

type MethodRules = Regex | In | NotIn | RequiredIf

/**
 * Single rule value (supports autocomplete + arbitrary strings + RuleContract instances)
 */
type RuleName = ValidationRuleName | `${ParamableValidationRuleName}:${string}` | RuleContract | MethodRules

export type ValidationRuleSet =
    | RuleName
    | RuleName[]
    | `${ValidationRuleName}${string & `|${string}`}`