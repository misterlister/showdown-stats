import { getData } from "./data.js"
import { printReport } from "./report.js"

async function main() {
    if (process.argv.length < 3) {
        console.log("Error: No username provided")
        return
    }
    if (process.argv.length > 3) {
        console.log("Error: Too many arguments")
        return
    }
    const username = process.argv[2]
    console.log(`Connecting to Pokemon Showdown to find data for user ${username}`)
    const report = await getData(username)
    printReport(report)
}

main()