import { lang } from 'ludolfc'
import { SIZE, SAND, ROCKET, PITFALL, ENERGY, ROCKET_X, ROCKET_Y, ROBOT_X, ROBOT_Y } from './constants'

const PITFALL_COUNT = 10
const ENERGY_COUNT = 20

const map = []

// init array
for (let i = 0; i < SIZE; i++) {
    map[i] = []
    for (let j = 0; j < SIZE; j++) {
        map[i][j] = SAND
    }
}

// pitfalls
let i = 0
while (i < PITFALL_COUNT) {
    const x = randomInt(2, SIZE - 2)
    const y = randomInt(2, SIZE - 2)
    if (map[x][y] === SAND) {
        map[x][y] = PITFALL 
        i++        
    }   
}

// energy points
let j = 0
while (j < ENERGY_COUNT) {
    const a = Math.random() > 0.5 ? randomInt(0, 2) : randomInt(SIZE - 2, SIZE)
    const b = randomInt(0, SIZE)
    const [x, y] = Math.random() > 0.5 ? [a, b] : [b, a]
    if (map[x][y] === SAND) {
        map[x][y] = ENERGY 
        j++
    }
}

// rocket
map[ROCKET_X][ROCKET_Y] = ROCKET
// robot
map[ROBOT_X][ROBOT_Y] = SAND // make a room for the robot

// copy current
const mapCopy = []
map.forEach((a,i) => mapCopy[i] = [...a])

function toLang(map) {
    const mapped = map.map(row => wrap(row.map(v => new lang.Number(v))))
    const m = wrap(mapped)
    m.isMap = true
    return m

    function wrap(m) {
        const wrapped = new lang.Array(m)
        wrapped.isProtected = true
        return wrapped
    }
}

function random(x, y, value, def) {
    if (value === ENERGY) {  // on the sides
        if (x > SIZE - 2 - 1 || x < 2 || y > SIZE - 2 - 1 || y < 2) {
            return !!Math.round(Math.random() - 0.3) ? value : def
        }
    } else
    if (value === PITFALL) {  
        if (!(x > SIZE - 2 - 1 || x < 2 || y > SIZE - 2 - 1 || y < 2)) {
            return !!Math.round(Math.random() - 0.4) ? value : def
        }
    }
    return def    
}

function randomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

const reset = () => mapCopy.forEach((a,i) => a.map((v,j) => map[i][j] = v))

export default {
    raw: map,
    mapped: toLang(map),
    reset,
}