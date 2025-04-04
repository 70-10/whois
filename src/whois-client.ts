import { createConnection } from "node:net";

export interface WhoisConfig {
    timeout?: number;
}

export interface WhoisResponse {
    raw: string;
    referServer?: string;
}

export class WhoisClient {
    private readonly defaultTimeout: number = 5000;

    constructor(private config: WhoisConfig = {}) { }

    private async queryServer(server: string, query: string): Promise<string> {
        const timeout = this.config.timeout || this.defaultTimeout;

        return new Promise((resolve, reject) => {
            let dataBuffer = "";
            let timeoutId: NodeJS.Timeout | null = null;
            let client: ReturnType<typeof createConnection>;

            // Timeout handler
            const handleTimeout = () => {
                if (client) {
                    client.destroy();
                }
                reject(new Error(`Connection timed out after ${timeout}ms`));
            };

            // Create client connection
            client = createConnection({ host: server, port: 43 }, () => {
                // In WHOIS protocol, CRLF is added to the end of the query
                client.write(query + "\r\n");
            });

            // Set timeout for the connection
            timeoutId = setTimeout(handleTimeout, timeout);

            // Setup event handlers
            client.on("data", (data: Buffer) => {
                dataBuffer += data.toString();
            });

            client.on("end", () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                resolve(dataBuffer);
            });

            client.on("error", (err) => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                reject(err);
            });
        });
    }

    public async lookup(ip: string): Promise<string> {
        // First, query the IANA WHOIS server
        let response = await this.queryServer("whois.iana.org", ip);

        // If the response contains a reference server, query that server again
        const referMatch = response.match(/refer:\s*(\S+)/i);
        if (referMatch) {
            const referServer = referMatch[1].trim();
            response = await this.queryServer(referServer, ip);
        }

        return response;
    }
}