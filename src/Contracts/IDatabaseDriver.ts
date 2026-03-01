export interface ValidationDatabaseExistsInput {
    table: string
    column: string
    value: any
    ignore?: any
    connection?: string
    attribute?: string
    data?: Record<string, any>
}

export interface IDatabaseDriver {
    exists (input: ValidationDatabaseExistsInput): boolean | Promise<boolean>
}
