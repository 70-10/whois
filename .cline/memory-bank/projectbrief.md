# Project Brief: WHOIS Client

## Overview
A command-line WHOIS client implementation in TypeScript, running on Bun runtime. The client allows users to query WHOIS information for IP addresses, following the WHOIS protocol specification.

## Core Requirements
1. Query WHOIS information for IP addresses
2. Handle recursive WHOIS queries through referral servers
3. Provide a simple command-line interface
4. Maintain robust error handling

## Technical Stack
- Language: TypeScript
- Runtime: Bun
- Protocol: WHOIS (Port 43)
- Network: Node.js net module

## Project Scope
- Single-purpose utility for WHOIS lookups
- Command-line interface
- Focus on reliability and accuracy of WHOIS data retrieval

## Success Criteria
1. Successfully query WHOIS information from IANA
2. Handle referral servers correctly
3. Present WHOIS information in a readable format
4. Proper error handling and user feedback