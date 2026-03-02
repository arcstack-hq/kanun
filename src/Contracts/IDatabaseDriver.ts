export interface ValidationDatabaseExistsInput {
    table: string
    column: string
    value: any
    ignore?: any
    connection?: string
    attribute?: string
    data?: Record<string, any>
}

export abstract class IDatabaseDriver {
    abstract exists (input: ValidationDatabaseExistsInput): boolean | Promise<boolean>
}
