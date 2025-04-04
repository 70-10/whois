# Test Structure Documentation

## Testing Pattern

### Arrange-Act-Assert (AAA)
Tests are structured following the AAA pattern:

1. Arrange
   - Set up test conditions
   - Configure mocks
   - Initialize test data

2. Act
   - Execute the code under test
   - Call the target method
   - Perform the operation

3. Assert
   - Verify the results
   - Check expectations
   - Validate state changes

## Test Organization

### Basic Query Test
```typescript
test("should query WHOIS server", async () => {
    // Arrange
    const mockSocket = { ... };
    const client = new WhoisClient();

    // Act
    const response = await client.lookup("8.8.8.8");

    // Assert
    expect(response).toBe(expectedResponse);
});
```

### Error Handling Test
```typescript
test("should handle error", async () => {
    // Arrange
    const mockSocket = { ... };
    const client = new WhoisClient();

    // Act & Assert
    await expect(
        client.lookup("8.8.8.8")
    ).rejects.toThrow("Error message");
});
```

## Mock Structure

### Socket Mock Template
```typescript
const mockSocket = {
    write: (data: string) => {
        // Track written data
    },
    on: (event: string, handler: Function) => {
        // Handle events
    },
    destroy: () => {
        // Clean up resources
    }
};
```

### Network Mock Pattern
```typescript
mock.module("node:net", () => ({
    createConnection: (options: any, callback: () => void) => {
        // Setup connection
        return mockSocket;
    }
}));
```

## Best Practices

1. Clear Section Comments
   - Mark Arrange, Act, Assert sections
   - Explain complex setup
   - Document test intentions

2. Mock Organization
   - Centralize mock setup
   - Use consistent patterns
   - Track important state

3. Error Handling
   - Test both success and failure
   - Verify error messages
   - Check cleanup operations

4. Async Testing
   - Use async/await consistently
   - Handle timeouts properly
   - Test asynchronous events