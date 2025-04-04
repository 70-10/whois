# System Patterns

## Architecture Design

### 1. Module Separation
- WHOIS client core logic as a class
- CLI interface in separate module
- Type safety through definitions

### 2. Error Handling
- Timeout implementation
- Network error handling
- Clear error messaging

### 3. Testing Patterns
- Network mocking
- Asynchronous testing
- Edge case verification

## Design Patterns

### 1. Class-based Design
```typescript
export class WhoisClient {
    private readonly defaultTimeout: number;
    constructor(private config: WhoisConfig = {})
    async queryServer(server: string, query: string): Promise<string>
    async lookup(ip: string): Promise<string>
}
```

### 2. Configuration Injection
- Settings injection through constructor
- Default value provision
- Extensible design

### 3. Promise-based API
- All asynchronous operations as Promises
- Unified error handling
- Integrated timeout processing

## Component Relationships

### 1. Client-Server Communication
- WHOIS protocol implementation
- Network connection management
- Response processing

### 2. Error Management
- Timeout handling
- Network error processing
- Clear error reporting

### 3. Testing Strategy
- Unit test implementation
- Mock server responses
- Edge case verification