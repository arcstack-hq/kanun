# Database Driver Contract

`exists` and `unique` rules rely on a user-provided database driver.

## Import

```ts
import { IDatabaseDriver, type ValidationDatabaseExistsInput } from 'kanun';
```

## Abstract Class

```ts
abstract class IDatabaseDriver {
  abstract exists(
    input: ValidationDatabaseExistsInput,
  ): boolean | Promise<boolean>;
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
class AppDatabaseDriver extends IDatabaseDriver {
  async exists({ table, column, value, ignore }) {
    const row = await db.table(table).where(column, value).first();

    if (!row) return false;
    if (ignore != null && String(row.id) === String(ignore)) return false;

    return true;
  }
}

const driver = new AppDatabaseDriver();
```

`exists` and `unique` rules both call this same `exists(input)` method.

Register globally:

```ts
Validator.useDatabase(driver);
```

Or per validator instance:

```ts
new Validator(data, rules).database(driver);
```
