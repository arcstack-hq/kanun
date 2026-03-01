# ValidationException

`ValidationException` is thrown by `validator.validate()` when validation fails.

## Import

```ts
import { ValidationException } from 'kanun';
```

## Typical Usage

```ts
try {
  await validator.validate();
} catch (error) {
  if (error instanceof ValidationException) {
    console.log(error.message);
    console.log(error.errors());
  }
}
```

## Properties

- `validator`: the validator instance
- `status`: HTTP-style status code (default `422`)
- `errorBag`: named bag (default `default`)
- `redirectTo`: optional redirect target
- `message`: summarized first validation error

## Methods

### `errors(): Record<string, string[]>`

Returns structured errors by field.

### `toResponse()`

Returns a response-friendly payload with `message` and `errors`.

### `setStatus(status)`

Sets response status and returns the same exception.

### `setErrorBag(name)`

Sets the error bag name.

### `setRedirectTo(url)`

Sets redirect URL metadata.

### `withMessages(messages)` (static)

Builds an exception from plain messages.
