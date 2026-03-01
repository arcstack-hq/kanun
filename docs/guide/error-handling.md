# Error Handling

Validation failures are represented by `ValidationException` and `MessageBag`.

## Throwing on Failure

```ts
const validator = new Validator(data, rules);
await validator.validate(); // throws ValidationException on failure
```

## Catching ValidationException

```ts
import { ValidationException } from 'kanun';

try {
  await validator.validate();
} catch (error) {
  if (error instanceof ValidationException) {
    console.log(error.message);
    console.log(error.errors());
  }
}
```

## Working with MessageBag

```ts
const errors = validator.errors();

errors.all(); // flat array of all messages
errors.get('email'); // messages for one field
errors.first('email'); // first message for one field
errors.isEmpty(); // true/false
errors.toArray(); // structured object by field
```

## Error Bags

Use named bags when you validate multiple forms/contexts:

```ts
await validator.validateWithBag('profile');
```

```ts
validator.errorBag(); // 'profile'
```

## Fail-fast vs Collect-all

- Default behavior collects all validation errors.
- `stopOnFirstFailure()` exits early on first failure.

```ts
const validator = new Validator(data, rules).stopOnFirstFailure();
```
