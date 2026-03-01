# Database Driver

Kanun uses a pluggable database driver for `exists` and `unique` rules.

## Why a Driver?

The validation package stays framework-agnostic and does not hard-couple to a specific ORM/query builder.

## Registering a Global Driver

```ts
import { Validator, type IDatabaseDriver } from 'kanun';

const driver: IDatabaseDriver = {
  async exists({ table, column, value, ignore }) {
    const row = await db.table(table).where(column, value).first();

    if (!row) return false;
    if (ignore != null && String(row.id) === String(ignore)) return false;

    return true;
  },
};

Validator.useDatabase(driver);
```

## Registering Per Validator Instance

```ts
const validator = new Validator(data, rules).database(driver);
```

## Using with Rules

```ts
const validator = new Validator(
  { username: 'legacy', email: 'john@example.com' },
  {
    username: 'unique:users,username',
    email: 'exists:users,email',
  },
);
```

## Rule Parameter Format

- `exists:table,column`
- `exists:connection.table,column`
- `exists:table,column,ignore`
- `unique:table,column`
- `unique:connection.table,column`
- `unique:table,column,ignore`

## Driver Input Shape

The `exists(input)` method receives:

- `table`
- `column`
- `value`
- `ignore` (optional)
- `connection` (optional)
- `attribute` (optional)
- `data` (optional full request payload)

See [Database Driver Contract](/api/database-driver) for types.
