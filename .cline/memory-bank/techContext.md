# Technical Context

## Development Environment
- TypeScript/Node.js
- Bun Runtime
- Bun Test Framework

## Key Dependencies
- node:net module (WHOIS protocol communication)
- TypeScript (type system)
- Bun (runtime and testing)

## Project Structure
```
src/
  ├── whois-client.ts   # WHOIS client implementation
  └── index.ts          # CLI entry point

tests/
  └── unit/
      └── whois-client.test.ts
```

## Technical Constraints

### 1. WHOIS Protocol
- Port 43 communication
- CRLF-terminated queries
- Plain text responses
- Server-specific response formats

### 2. Network Communication
- Required timeout handling
- Error handling importance
- Asynchronous operation management
- Connection cleanup requirements

### 3. Testing Environment
- Network mocking necessity
- Asynchronous test control
- Coverage requirements
- Edge case testing

## Technical Decisions

### 1. TypeScript Usage
- Strong typing for API
- Interface definitions
- Error type definitions
- Configuration type safety

### 2. Testing Strategy
- Unit tests with mocks
- Asynchronous test patterns
- Comprehensive test coverage
- Error case validation

### 3. Error Handling
- Promise-based error propagation
- Timeout management
- Network error handling
- Clear error messages