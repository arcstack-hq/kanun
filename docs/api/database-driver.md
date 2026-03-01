# Database Driver Contract

`exists` and `unique` rules rely on a user-provided database driver.

## Import

```ts
import type { IDatabaseDriver, ValidationDatabaseExistsInput } from 'kanun';
```

## Interface

```ts
interface IDatabaseDriver {
  exists(input: ValidationDatabaseExistsInput): boolean | Promise<boolean>;
}
```

## Input Type

```ts
interface ValidationDatabaseExistsInput {
  table: string;
  column: string;
  value: any;
  ignore?: any;
  connection?: string;
  attribute?: string;
  data?: Record<string, any>;
}
```

## Example Adapter

```ts
const driver: IDatabaseDriver = {
  async exists({ table, column, value, ignore }) {
    const row = await db.table(table).where(column, value).first();

    if (!row) return false;
    if (ignore != null && String(row.id) === String(ignore)) return false;

    return true;
  },
};
```

Register globally:

```ts
Validator.useDatabase(driver);
```

Or per validator instance:

```ts
new Validator(data, rules).database(driver);
```
