# Validation Rules

Kanun supports most common validation rules out of the box, with a focus on flexibility and type safety.

## Rule Syntax

Use either a pipe-delimited string:

```ts
{
  email: 'required|email|max:255';
}
```

Or an array:

```ts
{
  email: ['required', 'email', 'max:255'];
}
```

## Common Built-in Rules

- `required`
- `string`
- `numeric`
- `boolean`
- `email`
- `url`
- `min:x`
- `max:x`
- `between:min,max`
- `same:field`
- `different:field`
- `nullable`
- `sometimes`

## Nested and Wildcard Paths

```ts
const rules = {
  'user.name.first': 'required|min:2',
  'users.*.email': 'required|email',
};
```

## Extended Rules in Kanun

### `hex`

Validates a hexadecimal string (`#` prefix allowed).

```ts
{
  color: 'hex';
}
```

### `includes:foo,bar,...`

Checks that a string or array includes at least one provided value.

```ts
{
  topics: 'includes:news,marketing';
}
```

### `not_includes:foo,bar,...`

Checks that a string or array includes none of the provided values.

```ts
{
  tags: 'not_includes:banned,spam';
}
```

### `datetime:format`

Validates a parseable date string.

```ts
{
  date: 'datetime:YYYY-MM-DD';
}
```

### `exists:table,column[,ignore]`

Checks if a record exists in your configured database driver.

```ts
{
  username: 'exists:users,username';
}
```

### `unique:table,column[,ignore]`

Checks that no record exists for the value (respecting optional `ignore`).

```ts
{
  username: 'unique:users,username,1';
}
```

## Fail-fast Mode

```ts
const validator = new Validator(data, rules).stopOnFirstFailure();
```

## Rule Message Keys

Custom messages can be set per field/rule:

```ts
const messages = {
  'email.required': 'Email is required.',
  'email.email': 'Email must be a valid address.',
};
```

Next: [Custom Rules](/guide/custom-rules) and [Error Handling](/guide/error-handling).
