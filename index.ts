import { createConnection } from "node:net";

function queryWhoisServer(server: string, query: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const client = createConnection({ host: server, port: 43 }, () => {
            // In WHOIS protocol, CRLF is added to the end of the query
            client.write(query + "\r\n");
        });

        let dataBuffer = "";

        client.on("data", (data: Buffer) => {
            dataBuffer += data.toString();
        });

        client.on("end", () => {
            resolve(dataBuffer);
        });

        client.on("error", (err) => {
            reject(err);
        });
    });
}

async function lookupWhois(ip: string): Promise<string> {
    // First, query the IANA WHOIS server
    let response = await queryWhoisServer("whois.iana.org", ip);
    // If the response contains a reference server, query that server again
    const referMatch = response.match(/refer:\s*(\S+)/i);
    if (referMatch) {
        const referServer = referMatch[1].trim();
        response = await queryWhoisServer(referServer, ip);
    }
    return response;
}

(async () => {
    // process.argv[0] is the executable file, [1] is the script name, so command line arguments start from [2]
    const ip = process.argv[2] || "8.8.8.8";
    try {
        const result = await lookupWhois(ip);
        console.log(result);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
