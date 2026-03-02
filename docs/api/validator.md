# Validator

`Validator` is the main API for validating data.

## Constructor

```ts
new Validator(data, rules, messages?)
```

### Parameters

| Name       | Type                                               | Description               |
| ---------- | -------------------------------------------------- | ------------------------- |
| `data`     | `Record<string, any>`                              | Input payload to validate |
| `rules`    | `Record<string, string\|string[]\|ValidationRule>` | Validation rules          |
| `messages` | `Record<string, string>`                           | Optional custom messages  |

## Factory

```ts
const validator = Validator.make(data, rules, messages?)
```

## Running Validation

### `passes(): Promise<boolean>`

Runs validation and returns `true` on success.

### `fails(): Promise<boolean>`

Shortcut for `!passes()`.

### `validate(): Promise<Record<string, any>>`

Throws `ValidationException` on failure, otherwise returns validated data.

### `validateWithBag(bagName: string)`

Validates and tags the error bag name for downstream consumers.

### `stopOnFirstFailure()`

Enables fail-fast behavior.

## Working with Data and Rules

### `setData(data)`

Replace current data and reset execution state.

### `setRules(rules)`

Replace current rules and reset execution state.

### `addRule(key, rule)`

Add one rule to current rule set.

### `mergeRules(rules)`

Merge additional rules.

### `getData()` / `getRules()`

Return current data/rules.

## Accessing Validated Values

### `validated()`

Returns only keys present in the rule set.

### `validatedData()`

Returns validated keys that exist in the payload.

### `safe()`

Returns helpers:

```ts
const safe = validator.safe();
safe.only(['email']);
safe.except(['password']);
```

## Error Access

### `errors()`

Returns `MessageBag` with helper methods like `all()`, `get()`, `first()`, `isEmpty()`.

### `errorBag()`

Returns the active error bag name.

## Hooks

### `after(callback)`

Runs callback(s) after validation execution.

```ts
validator.after((instance) => {
  console.log(instance.errors().all());
});
```

## Database Driver

Use `exists` and `unique` with a driver:

```ts
Validator.useDatabase(driver);

const validator = new Validator(data, {
  username: 'unique:users,username',
});
```

Both rules delegate to `driver.exists(input)`.

You can also set it per instance:

```ts
const validator = new Validator(data, rules).database(driver);
```

See [Database Driver Contract](/api/database-driver).
