# WHOIS Client Library

## Project Purpose
- Query IP address information using the WHOIS protocol
- Provide a reusable TypeScript library
- Implement robust error handling

## Use Cases
1. IP address information lookup
2. Automatic referral server tracking
3. CLI tool usage
4. Library usage in other projects

## Operation Flow
1. Initial query to IANA WHOIS server
2. Follow-up query to referral server if exists
3. Retrieve and display final information

## Core Features
1. WHOIS Protocol Implementation
   - Port 43 communication
   - CRLF-terminated queries
   - Plain text response handling

2. Network Operations
   - Timeout handling
   - Error management
   - Asynchronous processing

3. Client Interface
   - Simple API
   - Type-safe operations
   - Configurable options