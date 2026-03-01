# Changelog

All notable changes to Arcstack Validator will be documented in this file.

The format follows semantic versioning principles.

## [Unreleased] - Upcoming features and changes that are currently in development or planned for the next release.

### Planned

- Plugin System: Introduce a first-class plugin architecture to extend Arcstack Validator without modifying core behavior. This will allow developers to add custom validation rules, integrate with third-party libraries, and provide hooks for custom error handling and message formatting.

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
