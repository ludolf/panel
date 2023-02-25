import { lang } from 'ludolfc'
import { SIZE, RADIUS, SAND, ROCKET, PITFALL, ENERGY, ROCKET_X, ROCKET_Y, ROBOT_X, ROBOT_Y } from './constants'

const map = []

// init array
for (let i = 0; i < SIZE; i++) map[i] = []
// pitfalls
for (let i = 2; i < SIZE - 2; i++) for (let j = 2; j < SIZE - 2; j++) map[i][j] = random(j, i, PITFALL, map[i][j])
// energy points
for (let i = 0; i < SIZE; i++) for (let j = 0; j < SIZE; j++) map[i][j] = random(j, i, ENERGY, map[i][j])
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
    let coeficient = 1
    if (value === ENERGY) {  // more probable on the sides
        const distanceX = Math.abs(x - (SIZE-1) / 2) 
        const distanceY = Math.abs(y - (SIZE-1) / 2) 
        coeficient = Math.max(distanceX, distanceY) / 15
    } else
    if (value === PITFALL) {  
        coeficient = 0.3   // unlikely
        if (x > RADIUS - 2 && x < RADIUS + 2
            || y > RADIUS - 2 && y < RADIUS + 2) return def // not around the rocket
    }
    return !!Math.round(Math.random() * 0.3 + coeficient) ? value : def
}

const reset = () => mapCopy.forEach((a,i) => a.map((v,j) => map[i][j] = v))

export default {
    raw: map,
    mapped: toLang(map),
    reset,
}