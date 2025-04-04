import { WhoisClient } from "./whois-client";

async function main() {
    const ip = process.argv[2] || "8.8.8.8";
    const client = new WhoisClient();

    try {
        const result = await client.lookup(ip);
        console.log(result);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();