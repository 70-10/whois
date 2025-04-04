# WHOIS Client

A simple and reusable WHOIS client library implemented in TypeScript.

## Features

- ✨ Simple to use
- 🔄 Automatic referral server tracking
- ⏱️ Timeout handling
- 🛡️ Type safety
- 🧪 Comprehensive testing

## Installation

```bash
bun install
```

## Usage

### As a CLI Tool

```bash
bun run src/index.ts 8.8.8.8
```

### As a Library

```typescript
import { WhoisClient } from "./whois-client";

const client = new WhoisClient({
  timeout: 5000 // Optional: Timeout in milliseconds
});

try {
  const result = await client.lookup("8.8.8.8");
  console.log(result);
} catch (error) {
  console.error("Error occurred:", error);
}
```

## API

### WhoisClient

#### Constructor

```typescript
new WhoisClient(config?: WhoisConfig)
```

Configuration options:
- `timeout`: Query timeout in milliseconds, default: 5000

#### Methods

##### lookup(ip: string): Promise<string>

Retrieves WHOIS information for the specified IP address.
Automatically follows referral servers if necessary.

```typescript
const result = await client.lookup("8.8.8.8");
```

## Development

### Running Tests

```bash
bun test
```

## Error Handling

The client throws errors in the following cases:

- Network errors
- Timeouts
- Invalid responses

## License

MIT

## Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request
