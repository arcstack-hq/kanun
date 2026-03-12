import { ValidationRule } from '../ValidationRule'
import { ValidationRuleCallable } from 'src/Contracts/RuleBuilder'
import type { Validator } from '../Validator'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

dayjs.extend(customParseFormat)

export class ExtendedRules extends ValidationRule {
    /**
     * The validator instance.
     */
    protected validator!: Validator<any, any>

    public setValidator (validator: Validator<any, any>): this {
        this.validator = validator
        return this
    }

    private resolveTarget (tableRef: string, attribute: string, parameters: string[] = []) {
        if (!tableRef) return null

        const [connection, table] = tableRef.includes('.')
            ? tableRef.split('.', 2)
            : [undefined, tableRef]

        const [column] = parameters
        const attributeColumn = attribute.includes('.') ? attribute.split('.').pop() : attribute

        return {
            table,
            connection,
            column: column || attributeColumn,
        }
    }

    rules: ValidationRuleCallable[] = [
        {

            name: 'hex',
            validator: (value: any) => {
                if (typeof value !== 'string') return false
                return /^[0-9a-fA-F]+$/.test(value.replace('#', ''))
            },
            message: 'The :attribute must be a valid hexadecimal string.'
        },
        {
            name: 'includes',
            validator: (value: any, parameters: string[] = []) => {
                if (value == null) return false

                if (Array.isArray(value)) {
                    return parameters.some(param => value.includes(param))
                }

                if (typeof value === 'string') {
                    return parameters.some(param => value.includes(param))
                }

                return false
            },
            message: 'The :attribute must include one of the following values: :values.'
        },
        {
            name: 'not_includes',
            validator: (value: any, parameters: string[] = []) => {
                if (value == null) return true

                if (Array.isArray(value)) {
                    return parameters.every(param => !value.includes(param))
                }

                if (typeof value === 'string') {
                    return parameters.every(param => !value.includes(param))
                }

                return true
            },
            message: 'The :attribute must not include any of the following values: :values.'
        },
        {
            name: 'datetime',
            validator: (value: any, parameters: string[] = [], _attribute) => {
                if (typeof value !== 'string') return false
                const [format] = parameters

                if (!format) {
                    return !isNaN(Date.parse(value))
                }

                try {
                    return dayjs(value, format, true).isValid()
                } catch {
                    return false
                }
            },
            message: 'The :attribute must be a valid date matching the format :format.'
        },
        {
            name: 'exists',
            validator: async (value: any, parameters: string[] = [], attribute = '') => {
                const [tableRef, column, ignore] = parameters
                const driver = this.validator?.getDatabaseDriver()

                if (!driver || !tableRef) return false

                const target = this.resolveTarget(tableRef, attribute, [column])
                if (!target?.column) return false

                return await driver.exists({
                    table: target.table,
                    connection: target.connection,
                    column: target.column,
                    value,
                    ignore,
                    attribute,
                    data: this.validator.getData(),
                })
            },
            message: 'The :attribute does not exist.'
        },
        {
            name: 'unique',
            validator: async (value: any, parameters: string[] = [], attribute = '') => {
                const [tableRef, column, ignore] = parameters
                const driver = this.validator?.getDatabaseDriver()

                if (!driver || !tableRef) return false

                const target = this.resolveTarget(tableRef, attribute, [column])
                if (!target?.column) return false

                return !(await driver.exists({
                    table: target.table,
                    connection: target.connection,
                    column: target.column,
                    value,
                    ignore,
                    attribute,
                    data: this.validator.getData(),
                }))
            },
            message: 'The :attribute has already been taken.'
        },
    ]
    validate () { }
}