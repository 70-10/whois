# WHOIS Client

A lightweight TypeScript WHOIS client implementation running on Bun runtime. This client allows you to query WHOIS information for IP addresses with automatic handling of referral servers.

## Features

- Simple command-line interface for IP address lookups
- Automatic handling of WHOIS referral servers
- Built with TypeScript for type safety
- Runs on fast Bun runtime
- Proper error handling

## Prerequisites

- [Bun](https://bun.sh) installed on your system

## Installation

```bash
# Clone the repository
git clone https://github.com/70-10/whois.git
cd whois

# Install dependencies
bun install
```

## Usage

Query WHOIS information for an IP address:

```bash
bun run index.ts <ip-address>
```

If no IP address is provided, it defaults to 8.8.8.8:

```bash
bun run index.ts
```

### Example

```bash
bun run index.ts 8.8.8.8
```

## How it Works

1. The client first queries the IANA WHOIS server (whois.iana.org)
2. If a referral server is specified in the response, it automatically queries that server
3. The final WHOIS information is displayed on the console

## Error Handling

The client handles various error cases:
- Network connection issues
- Invalid responses from WHOIS servers
- Server timeouts
- General error conditions

## Development

```bash
# Install dependencies
bun install

# Run TypeScript compiler
bun run tsc

# Run the client
bun run index.ts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
