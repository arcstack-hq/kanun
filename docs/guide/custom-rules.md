# Custom Rules

You can define reusable class-based rules by extending `ValidationRule`.

## Rule Class Example

```ts
import { ValidationRule } from 'kanun';

class StartsWithKanun extends ValidationRule {
  validate(
    attribute: string,
    value: any,
    fail: (message: string) => void,
  ): void {
    if (typeof value !== 'string' || !value.startsWith('kanun')) {
      fail(`The ${attribute} must start with kanun.`);
    }
  }
}
```

Use it in a validator:

```ts
const validator = new Validator(
  { slug: 'kanun-validator' },
  { slug: ['required', new StartsWithKanun()] },
);
```

## Accessing Request Data Inside Rules

Override `setData` if needed:

```ts
class RuleWithData extends ValidationRule {
  private payload: Record<string, any> = {};

  setData(data: Record<string, any>): this {
    this.payload = data;
    return this;
  }

  validate(
    attribute: string,
    value: any,
    fail: (message: string) => void,
  ): void {
    if (!this.payload.userId) {
      fail(`The ${attribute} is invalid because userId is missing.`);
    }
  }
}
```

## Writing Clear Failure Messages

Use descriptive error text so API/UI layers can display actionable feedback.

```ts
fail('The username is reserved and cannot be used.');
```

## Mixing Built-in and Custom Rules

```ts
{
  username: ['required', 'string', 'min:3', new StartsWithKanun()],
}
```
