<div align="center">
  <a href="https://arcstack-hq.github.io/validator"  target="_blank">
    <img src="https://raw.githubusercontent.com/arcstack-hq/assets/refs/heads/main/logo-full.svg" width="200" alt="Arcstack Logo">
  </a>
  <h1 align="center"><a href="https://arcstack-hq.github.io/validator">Arcstack Validator</a></h1>

[![Framework][ix]][lx]
[![Validation Package Version][i1]][l1]
[![Downloads][d1]][l1]
[![Tests][tei]][tel]
[![License][lini]][linl]

</div>

# About Arcstack Validator

Lightweight framework-agnostic and TypeScript-first validation library. Provides a rich set of built-in rules, custom rule support, nested data validation, conditional rules, localized error messages, and a flexible API for validating complex data structures in Node.js applications.

## Installation

```bash
npm install @arcstack/validator
```

## Features

- Rule-based validation — Supports common rules like required, min, max, email, url, numeric, boolean, in, regex, etc.
- Nested data validation — Dot notation for nested objects (user.email, items.\*.price).
- Custom error messages — Per-rule and per-field message overrides.
- Batch validation — Validate multiple datasets or groups in one call.
- Conditional validation — Rules that only apply when other fields meet conditions (required_if, sometimes, exclude_unless).
- Implicit rules — Rules that run even when attributes are missing (e.g., accepted, required).

- Custom rules — Define user-provided validation rules as functions or classes.
- Async rules — Support for async validation (e.g., checking uniqueness in a database).
- Attribute sanitization — Optional transformation (e.g., trimming, normalizing case) before validation.
- Dynamic rule sets — Rules can be generated at runtime (e.g., based on user roles).
- Dependent rules — Rules that reference other fields dynamically.

- Localized error messages — Built-in support for localization and i18n message templates.
- Structured errors — Validation errors returned as structured objects or flat key–message pairs.
- Fail-fast mode — Option to stop at the first failure or collect all errors.
- Human-readable summaries — Helper for formatting readable validation reports.

- TypeScript-first design — Full type inference for rules, messages, and validated data.
- Chainable API — Optional fluent syntax for building validators.

## Usage

## Code of Conduct

In order to ensure that the Arcstack community is welcoming to all, please review and abide by the [Code of Conduct](https://arcstack-hq.github.io/code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Arcstack, please send an e-mail to Legacy via hi@toneflix.net. All security vulnerabilities will be promptly addressed.

## License

All Arcstack packages are open source and licensed under the [MIT license](LICENSE).

[ix]: https://img.shields.io/npm/v/%40arcstack%2Fcore?style=flat-square&label=Framework&color=%230970ce
[lx]: https://www.npmjs.com/package/@arcstack/core
[i1]: https://img.shields.io/npm/v/%40arcstack%2Fvalidator?style=flat-square&label=@arcstack/validator&color=%230970ce
[l1]: https://www.npmjs.com/package/@arcstack/validator
[d1]: https://img.shields.io/npm/dt/%40arcstack%2Fvalidator?style=flat-square&label=Downloads&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40arcstack%2Fvalidator
[linl]: https://github.com/arcstack-hq/framework/blob/main/LICENSE
[lini]: https://img.shields.io/github/license/arcstack/framework
[tel]: https://github.com/arcstack-hq/framework/actions/workflows/test.yml
[tei]: https://github.com/arcstack-hq/framework/actions/workflows/test.yml/badge.svg
