import stringify from './stringify'
import map from './map'
import robot from './robot'

const mapTable = document.getElementById('map')
const resultDiv = document.getElementById('result')

robot.raw.callback.move = async () => await display(map.mapped)

async function display(...input) {
    if (!input || !input[0]) return
    if (input[0].isMap || input[0].isRobot) displayMap()
    else resultDiv.innerHTML = input.map(i => stringify(i)).join(' ')
    await sleep()
}

function displayMap() {
    resetDisplay()
    const m = map.raw
    const r = robot.raw
    const size = m.length
    let content = ''
    for (let i = size - 1; i >= 0; i--) {
        content += '<tr>'
        for (let j = 0; j < size; j++) {
            const value = (j === r.position.x && i === r.position.y) ? 1 : m[i][j]
            content += `<td class="map-cell map-${i}-${j} map-value-${value} `
            if (i === 0 || j === 0 || i === size - 1 || j === size - 1) content += 'side '
            if (i === 0 && j === 0) content += 'corner bottom-left'
            else if (i === 0 && j === size - 1) content += 'corner bottom-right'
            else if (i === size - 1 && j === 0) content += 'corner top-left'
            else if (i === size - 1 && j === size - 1) content += 'corner top-right'
            content += `">&nbsp;</td>`
        }
        content += '</tr>'
    }
    mapTable.innerHTML = content
}

function resetDisplay() {
    resultDiv.innerHTML = ''
    mapTable.innerHTML = ''
}

function sleep(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { display, resetDisplay }