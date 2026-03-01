# ValidationRule

`ValidationRule` is the base class for class-based custom rules.

## Import

```ts
import { ValidationRule } from 'kanun';
```

## Extend the Class

```ts
class CustomRule extends ValidationRule {
  validate(
    attribute: string,
    value: any,
    fail: (message: string) => void,
  ): void {
    if (value !== 'expected') {
      fail(`The ${attribute} is invalid.`);
    }
  }
}
```

## Required Method

### `validate(attribute, value, fail): void`

- `attribute`: field name being validated
- `value`: current field value
- `fail(message)`: call to mark rule as failed

## Optional Hooks

### `setData(data): this`

Called with full validator payload before rule evaluation.

### `setValidator(validator): this`

Called with current `Validator` instance.

## Notes

- Call `fail(...)` at least once to fail the rule.
- If `fail(...)` is never called, the rule passes.
