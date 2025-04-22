import { expect, test, mock, describe } from "bun:test";
import { createConnection } from "node:net";
import { WhoisClient } from "../../src/whois-client";

describe("WhoisClient", () => {
    test("should query WHOIS server and return response", async () => {
        // Arrange
        const expectedQuery = "8.8.8.8\r\n";
        const expectedResponse = "NetRange: 8.8.8.0 - 8.8.8.255\n";
        let writtenData = "";

        const mockSocket = {
            write: (data: string) => {
                writtenData = data;
            },
            on: (event: string, handler: Function) => {
                if (event === "data") {
                    setTimeout(() => {
                        handler(Buffer.from(expectedResponse));
                    }, 0);
                } else if (event === "end") {
                    setTimeout(handler, 10);
                }
            }
        };

        mock.module("node:net", () => ({
            createConnection: (options: any, callback: () => void) => {
                setTimeout(() => callback(), 0);
                return mockSocket;
            }
        }));

        const client = new WhoisClient();

        // Act
        const response = await client.lookup("8.8.8.8");

        // Assert
        expect(writtenData).toBe(expectedQuery);
        expect(response).toBe(expectedResponse);
    });

    test("should handle timeout", async () => {
        // Arrange
        let isDestroyed = false;
        const mockSocket = {
            write: (data: string) => { },
            on: (event: string, handler: Function) => {
                if (event === "connect") {
                    setTimeout(handler, 0);
                }
            },
            destroy: () => {
                isDestroyed = true;
            }
        };

        mock.module("node:net", () => ({
            createConnection: (options: any, callback: () => void) => {
                setTimeout(callback, 0);
                return mockSocket;
            }
        }));

        const client = new WhoisClient({ timeout: 50 });

        // Act & Assert
        await expect(
            client.lookup("8.8.8.8")
        ).rejects.toThrow("Connection timed out after 50ms");
    });

    test("should handle network error", async () => {
        // Arrange
        const mockSocket = {
            write: (data: string) => { },
            on: (event: string, handler: Function) => {
                if (event === "error") {
                    setTimeout(() => {
                        handler(new Error("Connection refused"));
                    }, 0);
                }
            },
            destroy: () => { }
        };

        mock.module("node:net", () => ({
            createConnection: (options: any, callback: () => void) => {
                setTimeout(() => callback(), 0);
                return mockSocket;
            }
        }));

        const client = new WhoisClient();

        // Act & Assert
        await expect(
            client.lookup("8.8.8.8")
        ).rejects.toThrow("Connection refused");
    });

    describe("lookup", () => {
        test("should get response directly from IANA server", async () => {
            // Arrange
            const mockDirectResponse = `
whois:        192.0.2.0/24
organization: IANA
contact:      abuse@iana.org
`;
            let queryCount = 0;
            let writtenData = "";

            const mockSocket = {
                write: (data: string) => {
                    writtenData = data;
                },
                on: (event: string, handler: Function) => {
                    if (event === "data") {
                        setTimeout(() => {
                            handler(Buffer.from(mockDirectResponse));
                        }, 0);
                    } else if (event === "end") {
                        setTimeout(handler, 10);
                    }
                }
            };

            mock.module("node:net", () => ({
                createConnection: (options: any, callback: () => void) => {
                    queryCount++;
                    setTimeout(() => callback(), 0);
                    return mockSocket;
                }
            }));

            const client = new WhoisClient();

            // Act
            const response = await client.lookup("192.0.2.1");

            // Assert
            expect(response).toBe(mockDirectResponse);
            expect(queryCount).toBe(1);
            expect(writtenData).toBe("192.0.2.1\r\n");
        });

        test("should follow referral server", async () => {
            // Arrange
            const mockIANAResponse = `
whois:        8.8.8.0/24
refer:        whois.arin.net
organization: IANA`;

            const mockARINResponse = `
NetRange:       8.8.8.0 - 8.8.8.255
Organization:   Google LLC
RegDate:        2014-03-14
Updated:        2014-03-14`;

            let queryCount = 0;
            let currentServer = "whois.iana.org";
            let writtenData = "";

            const mockSocket = {
                write: (data: string) => {
                    writtenData = data;
                },
                on: (event: string, handler: Function) => {
                    if (event === "data") {
                        setTimeout(() => {
                            const response = currentServer === "whois.iana.org" ? mockIANAResponse : mockARINResponse;
                            handler(Buffer.from(response));
                        }, 0);
                    } else if (event === "end") {
                        setTimeout(handler, 10);
                    }
                }
            };

            mock.module("node:net", () => ({
                createConnection: (options: any, callback: () => void) => {
                    currentServer = options.host;
                    queryCount++;
                    setTimeout(() => callback(), 0);
                    return mockSocket;
                }
            }));

            const client = new WhoisClient();

            // Act
            const response = await client.lookup("8.8.8.8");

            // Assert
            expect(queryCount).toBe(2);
            expect(response).toBe(mockARINResponse);
            expect(currentServer).toBe("whois.arin.net");
        });

        test("should follow referral server for IPv4 address", async () => {
            // Arrange
            const mockIANAResponse = `
whois:        8.8.8.0/24
refer:        whois.arin.net
organization: IANA`;

            const mockARINResponse = `
NetRange:       8.8.8.0 - 8.8.8.255
Organization:   Google LLC
RegDate:        2014-03-14
Updated:        2014-03-14`;

            let queryCount = 0;
            let currentServer = "whois.iana.org";
            let writtenData = "";

            const mockSocket = {
                write: (data: string) => {
                    writtenData = data;
                },
                on: (event: string, handler: Function) => {
                    if (event === "data") {
                        setTimeout(() => {
                            const response = currentServer === "whois.iana.org" ? mockIANAResponse : mockARINResponse;
                            handler(Buffer.from(response));
                        }, 0);
                    } else if (event === "end") {
                        setTimeout(handler, 10);
                    }
                }
            };

            mock.module("node:net", () => ({
                createConnection: (options: any, callback: () => void) => {
                    currentServer = options.host;
                    queryCount++;
                    setTimeout(() => callback(), 0);
                    return mockSocket;
                },
                isIPv4: () => true,
                isIPv6: () => false
            }));

            const client = new WhoisClient();

            // Act
            const response = await client.lookup("8.8.8.8");

            // Assert
            expect(queryCount).toBe(2);
            expect(response).toBe(mockARINResponse);
            expect(currentServer).toBe("whois.arin.net");
        });

        test("should follow whois server for IPv6 address", async () => {
            // Arrange
            const mockIANAResponse = `
whois:        whois.ripe.net
organisation: RIPE NCC
status:       ALLOCATED`;

            const mockRIPEResponse = `
% This is the RIPE Database query service.
% Information related to '2001:db8::/32'

inetnum:       2001:db8::/32
netname:       EXAMPLE-NET-EU
country:       EU
org:           ORG-TEST-RIPE
admin-c:       TEST-RIPE
tech-c:        TEST-RIPE
status:        ALLOCATED`;

            let queryCount = 0;
            let currentServer = "whois.iana.org";
            let writtenData = "";

            const mockSocket = {
                write: (data: string) => {
                    writtenData = data;
                },
                on: (event: string, handler: Function) => {
                    if (event === "data") {
                        setTimeout(() => {
                            const response = currentServer === "whois.iana.org" ? mockIANAResponse : mockRIPEResponse;
                            handler(Buffer.from(response));
                        }, 0);
                    } else if (event === "end") {
                        setTimeout(handler, 10);
                    }
                }
            };

            mock.module("node:net", () => ({
                createConnection: (options: any, callback: () => void) => {
                    currentServer = options.host;
                    queryCount++;
                    setTimeout(() => callback(), 0);
                    return mockSocket;
                },
                isIPv4: () => false,
                isIPv6: () => true
            }));

            const client = new WhoisClient();

            // Act
            const response = await client.lookup("2001:db8::1");

            // Assert
            expect(queryCount).toBe(2);
            expect(response).toBe(mockRIPEResponse);
            expect(currentServer).toBe("whois.ripe.net");
        });

        test("should not follow referral for IPv6 when 'refer' field exists", async () => {
            // Arrange
            const mockIANAResponse = `
refer:        whois.arin.net
whois:        whois.ripe.net
organisation: RIPE NCC
status:       ALLOCATED`;

            const mockRIPEResponse = `
% This is the RIPE Database query service.
% Information related to '2001:db8::/32'

inetnum:       2001:db8::/32
netname:       EXAMPLE-NET-EU`;

            let queryCount = 0;
            let currentServer = "whois.iana.org";
            let writtenData = "";

            const mockSocket = {
                write: (data: string) => {
                    writtenData = data;
                },
                on: (event: string, handler: Function) => {
                    if (event === "data") {
                        setTimeout(() => {
                            const response = currentServer === "whois.iana.org" ? mockIANAResponse : mockRIPEResponse;
                            handler(Buffer.from(response));
                        }, 0);
                    } else if (event === "end") {
                        setTimeout(handler, 10);
                    }
                }
            };

            mock.module("node:net", () => ({
                createConnection: (options: any, callback: () => void) => {
                    currentServer = options.host;
                    queryCount++;
                    setTimeout(() => callback(), 0);
                    return mockSocket;
                },
                isIPv4: () => false,
                isIPv6: () => true
            }));

            const client = new WhoisClient();

            // Act
            const response = await client.lookup("2001:db8::1");

            // Assert
            expect(queryCount).toBe(2);
            expect(response).toBe(mockRIPEResponse);
            expect(currentServer).toBe("whois.ripe.net"); // Should use whois field, not refer
        });
    });
});