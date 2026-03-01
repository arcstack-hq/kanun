# Changelog

All notable changes to Kanun will be documented in this file.

The format follows semantic versioning principles.

## [Unreleased] - Upcoming features and changes that are currently in development or planned for the next release.

### Added

- Add a practical README usage guide with quickstart examples for validation, custom messages, nested fields, custom rules, and database-backed `exists`/`unique` rules.
- Expand VitePress documentation with complete guide pages (`getting-started`, `validation-rules`, `database-driver`, `custom-rules`, `error-handling`).
- Replace placeholder API docs with package-specific references for `Validator`, `ValidationRule`, `ValidationException`, and `IDatabaseDriver`.
- Update VitePress navigation/sidebar to expose all documentation sections.

### Planned

- Plugin System: Introduce a first-class plugin architecture to extend Kanun without modifying core behavior. This will allow developers to add custom validation rules, integrate with third-party libraries, and provide hooks for custom error handling and message formatting.

## [0.1.0] - Initial Release

### Added

- Add ImplicitRule and ValidationRule classes for defining validation rules.
- Introduce ExtendedRules class with additional validation methods (hex, includes, not_includes, datetime, exists, unique).
- Create ValidationServiceProvider for managing validation services.
- Implement ValidationException for structured error handling.
- Develop MessageBag utility for managing validation messages.
- Add Validator class to orchestrate validation logic and error reporting.
- Create tests for Validator and validation rules to ensure functionality.
- Set up TypeScript configuration and testing environment with Vitest.
