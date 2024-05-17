import axios from 'axios'
import { JSDOM } from 'jsdom'

async function getData(username) {
    const apiEndpoint = `https://pokemonshowdown.com/users/${username}`
    try {
        const response = await axios.get(apiEndpoint)
        const data = response.data

        console.log(`Battle stats for ${username}:`)
        const battleStats = getBattleStats(data)

        return battleStats
        
    } catch (error) {
        console.error(`Error: ${error.response ? error.response.status : ''} - ${error.message}`)
        return null
    }
}

function getBattleStats(html) {
    const dom = new JSDOM(html)
    const document = dom.window.document

    const battleStats = {}

    const table = document.querySelector('.pfx-body.ladder table')
    if (!table) {
        console.error('Table not found.')
        return
    }

    // Process each row in the table
    const rows = Array.from(table.querySelectorAll('tr'))
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td, th'))
        if (cells.length === 4) { // Assuming there are 4 cells per row
            const key = cells[0].textContent.trim()
            const elo = cells[1].textContent.trim()
            const gxe = cells[2].textContent.trim()
            const glicko = cells[3].textContent.trim()

            battleStats[key] = { elo, gxe, glicko }
        }
    })

    // Print the extracted user data
    
    for (const key in battleStats) {
        const title = key.padEnd(20)
        const elo = battleStats[key].elo.padEnd(7)
        const gxe = battleStats[key].gxe.padEnd(7)
        const glicko = battleStats[key].glicko.padEnd(12)
        console.log(title, elo, gxe, glicko)
    }
    
    return battleStats
}



export { getData }


