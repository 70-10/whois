# Project Rules

## Documentation Standards

1. Language Usage
   - Technical documentation: English
   - Project-specific docs in docs/: Japanese
   - Comments in source code: English
   - Memory bank: English

2. File Organization
   - Source code in src/
   - Tests in tests/
   - Documentation in docs/
   - Memory bank in .cline/memory-bank/

## Code Standards

1. TypeScript Usage
   - Strong typing required
   - Interface definitions for public APIs
   - Proper error types

2. Testing Requirements
   - Unit tests for all public methods
   - Error case coverage
   - Mock network operations
   - Timeout testing

3. Testing Pattern
   - Use Arrange-Act-Assert pattern
   - Clear section comments
   - Consistent mock structure
   - Proper async testing

4. Error Handling
   - Clear error messages
   - Proper error propagation
   - Timeout handling
   - Network error management

## Development Workflow

1. Implementation
   - Test-driven development
   - Type definitions first
   - Documentation updates
   - Error handling

2. Review Process
   - Code review required
   - Test coverage check
   - Documentation review
   - Type safety verification

## Test Organization

1. Test Structure
   - Follow AAA pattern
   - Clear section separation
   - Descriptive test names
   - Focused test cases

2. Mock Implementation
   - Consistent mock patterns
   - State tracking when needed
   - Proper cleanup
   - Event simulation

3. Test Maintenance
   - Regular test updates
   - Performance monitoring
   - Coverage maintenance
   - Pattern consistency

## Maintenance Guidelines

1. Documentation Updates
   - Keep technical docs in English
   - Update memory bank regularly
   - Maintain clear API documentation

2. Code Quality
   - Regular refactoring
   - Performance monitoring
   - Test maintenance
   - Type safety checks