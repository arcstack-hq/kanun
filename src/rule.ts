'use strict'

import In from './Rules/in'
import NotIn from './Rules/notIn'
import Regex from './Rules/regex'
import RequiredIf from './Rules/requiredIf'

export function requiredIf (callback: boolean | CallableFunction): RequiredIf {
    return new RequiredIf(callback)
};

export function ruleIn (values: (string | number)[]): In {
    return new In(values)
}

export function ruleNotIn (values: (string | number)[]): NotIn {
    return new NotIn(values)
}

export function regex (value: RegExp): Regex {
    return new Regex(value)
}

export function notRegex (value: RegExp): Regex {
    return new Regex(value, false)
}
