import { ROBOT, ROCKET, PITFALL, ENERGY, ROCKET_X, ROCKET_Y } from './constants'
import stringify from './stringify'
import map from './map'
import robot from './robot'
import rocket from './rocket'

const mapTable = document.getElementById('map')
const resultDiv = document.getElementById('result')
const scoreDiv = document.getElementById('score')

robot.raw.callback.move = async () => { displayMap(); await sleep() }
rocket.raw.callback.start = async () => {  // TODO
    const delay = 1000
    await displayWithDelay(delay, "...5...")
    await displayWithDelay(delay, "...4...")
    await displayWithDelay(delay, "...3...")
    await displayWithDelay(delay, "...2...")
    await displayWithDelay(delay, "...1...")
    await displayWithDelay(delay, "🥳🚀🏠")
    resetDisplay()
    mapTable.classList.add('universe')
}

async function displayWithDelay(delay, ...input) {
    if (!input || !input[0]) return
    if (input.some(isSpecialObject)) displayMap(input.length === 1)
    const text = input.filter(i => !isSpecialObject(i)).map(i => stringify(i)).join(' ')
    console.log('Display:', text)
    resultDiv.innerHTML = text
    await sleep(delay)

    function isSpecialObject(o) {
        return o.isMap || o.isRobot || o.isRocket
    }
}

async function display(...input) {
    await displayWithDelay(500, ...input)
}

function displayMap(reset = true) {
    if (reset) resetDisplay()
    const m = map.raw
    const r = robot.raw

    scoreDiv.innerHTML = r.status.energy

    const size = m.length
    let content = ''
    for (let y = size - 1; y >= 0; y--) {
        content += '<tr>'
        for (let x = 0; x < size; x++) {
            const value = (isRobot(x, y) && !isRocket(x, y)) ? ROBOT : m[x][y]
            const flag = value === ROBOT && r.status.trapped ? 'trapped' 
                       : value === ROBOT && r.status.charging ? 'charging' 
                       : ''
            content += `<td class="map-cell map-${x}-${y} map-value-${mapValue(value)} ${flag} `
            if (x === 0 || y === 0 || x === size - 1 || y === size - 1) content += 'side '
            if (x === 0 && y === 0) content += 'corner bottom-left'
            else if (y === 0 && x === size - 1) content += 'corner bottom-right'
            else if (y === size - 1 && x === 0) content += 'corner top-left'
            else if (y === size - 1 && x === size - 1) content += 'corner top-right'
            content += `">&nbsp;</td>`
        }
        content += '</tr>'
    }
    mapTable.innerHTML = content

    function isRobot(x, y) {
        return x === r.positionRaw.x && y === r.positionRaw.y
    }

    function isRocket(x, y) {
        return x === ROCKET_X && y === ROCKET_Y
    }
}

function resetDisplay() {
    mapTable.classList.remove('universe')
    resultDiv.innerHTML = ''
    mapTable.innerHTML = ''
}

function mapValue(id) {
    return id === ROBOT ? 'robot' :
           id === ROCKET ? 'rocket' :
           id === PITFALL ? 'pitfall' :
           id === ENERGY ? 'energy' :
           'sand'
}

function sleep(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { display, resetDisplay }