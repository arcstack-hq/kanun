import { BaseValidator, make, register, registerImplicit } from '../src'
import { assert, beforeEach, describe, it } from 'vitest'

import IImplicitRule from 'src/Rules/IImplicitRule'
import { Lang } from 'src/Lang'
import RuleContract from 'src/Rules/IRuleContract'
import locales from './lang'

Lang.setTranslationObject(locales)

describe('Register Rule', function () {
    describe('Register simple telephone rule', function () {
        register('telephone', function (value) {
            return value.match(/^\d{3}-\d{3}-\d{4}$/)
        })

        const validation = make()
        it('Passing invalid data to the telephone validation rule should fail', function () {
            validation.setData({ cell: '1223' }).setRules({ cell: 'telephone' })
            assert.equal(validation.validate(), false)
        })
        it('An error message must be returned in case of failure', function () {
            assert.equal(validation.errors().first(), 'The cell phone number is not in the format XXX-XXX-XXXX.')
        })
        it('Validation should succeed in case data matches registered telephone rule', function () {
            validation.setData({ cell: '123-456-7890' })
            assert.ok(validation.validate())
        })
    })
    describe('Register complex telephone rule', function () {
        register('complex_telephone', function (this: any, value, paramters) {
            this.requireParameterCount(1, paramters, 'complex_telephone')
            const pattern = new RegExp('^\\+' + paramters![0] + ' \\d{3}-\\d{3}-\\d{4}$')
            return value.match(pattern)
        }, function (message, parameters) {
            return message.replace(':code', parameters[0])
        })

        const validator = make()

        it('The complex telephone validation rule requires at least one parameter', function () {
            validator.setData({ cell: '1234' }).setRules({ cell: 'complex_telephone' })
            assert.throws(() => validator.validate())
        })
        it('Passing invalid data to the complex telephone validation rule should fail', function () {
            validator.setRules({ cell: 'complex_telephone:961' })
            assert.equal(validator.validate(), false)
        })
        it('An error message should be returned in case of failure', function () {
            assert.equal(validator.errors().first(), 'The cell phone number is not in the format +961 XXX-XXX-XXXX.')
        })
        it('Validation should succeed in case data matches registered complex telephone rule', function () {
            validator.setData({ cell: '+961 123-456-7890' })
            assert.ok(validator.validate())
        })
    })
    describe('Registering an already existing rule should not work', function () {
        register('required', () => false)
        register('required_test', () => false)
        const validator = make()

        it('The required rule should behave in the normal logic', function () {
            validator.setData({ name: 'Jad' }).setRules({ name: 'required' })
            assert.ok(validator.validate())
        })
        it('Trying to override an custom registered rule should not work', function () {
            register('required_test', () => true)

            validator.setData({ name: 'Jad' }).setRules({ name: 'required_test' })
            assert.equal(validator.validate(), false)
        })
    })
    describe('Register implicit rule that requires access to data and to the already existing rules', function () {
        registerImplicit('required_if_type', function (this: any, value, parameters) {
            const [target, type] = parameters!

            if (typeof this.data[target] === type) {
                return this.validateRequired(value)
            }

            return true
        }, function (message, paramters, data) {
            const [target] = paramters
            message = message.replace(':target', target)
            message = message.replace(':type', typeof data![target as never])
            return message
        })

        const validator = make()

        it('Passing invalid data to the required_if_type rule should fail', function () {
            validator.setData({ first: 'Jad' }).setRules({ last: 'required_if_type:first,string' })
            assert.equal(validator.validate(), false)
        })
        it('An Error message should be returned in case of failure', function () {
            assert.equal(validator.errors().first(), 'The last is required when first is of type string.')
        })
        it('Validation should succeed in case data matches registered required_if_type rule', function () {
            validator.setData({ first: 'Jad', last: 'Khoury' })
            assert.ok(validator.validate())

            validator.setData({ first: 1 })
            assert.ok(validator.validate())
        })
    })
})

describe('Create Custom rule using class notation', function () {
    describe('Create simple class validation rule', function () {

        class UpperCase extends RuleContract {
            passes (value: any) {

                if (typeof value != 'string') {
                    return false
                }

                return value.toUpperCase() === value
            }

            getMessage () {
                return 'The :attribute must be uppercase.'
            }
        };

        const validator = make()

        it('Validation should fail if value is not uppercase', function () {
            validator.setData({ value: 'test' }).setRules({ value: new UpperCase })
            assert.equal(validator.validate(), false)
        })
        it('An Error message should be returned in case of failure', function () {
            assert.equal(validator.errors().first(), 'The value must be uppercase.')
        })
        it('Validation should succeed if value is uppercase or does not exist', function () {
            validator.setData({ value: 'TEST' })
            assert.ok(validator.validate())

            validator.setData({})
            assert.ok(validator.validate())
        })
    })

    describe('Create a complex implicit class validation rule with translation', function () {
        class RequiredIfType extends IImplicitRule {

            target: string
            type

            constructor(target: string, type: string) {
                super()
                this.target = target
                this.type = type
            }

            passes (this: any, value: any) {
                if (typeof this.data[this.target] === this.type) {
                    return value !== null && typeof value !== 'undefined'
                }

                return true
            }

            getMessage () {
                return this.trans('required_if_type', {
                    target: this.target,
                    type: this.type
                })
            }
        };

        let validator: BaseValidator

        beforeEach(() => {
            validator = make()
        })

        it('Passing invalid data to the RequiredIfType rule class should fail', function () {
            validator.setData({ first: 'Jad' }).setRules({ last: new RequiredIfType('first', 'string') })
            assert.equal(validator.validate(), false)
        })
        it('An Error message should be returned in case of failure', function () {
            validator.setData({ first: 'Jad' }).setRules({ last: new RequiredIfType('first', 'string') })
            validator.validate()
            assert.equal(validator.errors().first(), 'The last is required when first is of type string.')
        })
        it('Validation should succeed in case data matches registered required_if_type rule', function () {
            validator.setData({ first: 'Jad', last: 'Khoury' })
            assert.ok(validator.validate())

            validator.setData({ first: 1 })
            assert.ok(validator.validate())
        })
    })

})

describe('Pass rule as callback function', function () {
    const validator = make({ value: 'test' }).setRules({
        value: [
            'required',
            function (value, fail, attribute) {
                if (value === 'test') {
                    fail(`The ${attribute} is invalid.`)
                }
            }
        ]
    })

    it('Validation should fail if value does not match condition in the function', function () {
        assert.equal(validator.validate(), false)
    })
    it('An Error message should be returned in case of failure', function () {
        assert.equal(validator.errors().first(), 'The value is invalid.')
    })
    it('Validation should succeed in case the value matches the condition specified in the function', function () {
        validator.setData({ value: 'any' })
        assert.ok(validator.validate())
    })
})