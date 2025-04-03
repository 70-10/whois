# Product Context

## Problem Statement
Network administrators and developers need a simple, reliable way to query WHOIS information for IP addresses. While there are many WHOIS clients available, a lightweight TypeScript implementation that handles referral servers properly fills a specific niche.

## Solution
A command-line WHOIS client that:
- Provides straightforward IP address lookups
- Automatically handles referral servers
- Offers clear error messages
- Runs efficiently on the Bun runtime

## User Experience Goals
1. Simple Command Interface
   - Single argument for IP address input
   - Default IP (8.8.8.8) for testing
   - Clear output format

2. Reliability
   - Proper error handling
   - Automatic referral server handling
   - Timeout handling for unresponsive servers

3. Performance
   - Quick response times
   - Efficient memory usage
   - Lightweight deployment

## Target Users
- Network administrators
- Developers
- System administrators
- Security researchers