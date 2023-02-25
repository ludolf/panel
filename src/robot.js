import { lang } from 'ludolfc'
import { SIZE, SAND, ENERGY, PITFALL, ROBOT_X, ROBOT_Y } from './constants'
import map from './map'

const ENERGY_DEFAULT = 15
const ENERGY_CHARGE = 3
const ENERGY_MOVE = 1
const ENERGY_AVOID = 2

const position = { x: ROBOT_X, y: ROBOT_Y }
const positionLang = new lang.Object({
    x: new lang.Number(position.x),
    y: new lang.Number(position.y),
})
const callback = {
    move: null, // after moved
}
const status = {
    trapped: false,
    charging: false,
    energy: ENERGY_DEFAULT,
}
const energyLang = new lang.Number(status.energy)

function updateEnergy(delta) {
    status.energy += delta
    energyLang.value = status.energy
}

function beforeMove() {
    status.charging = false
    if (status.trapped) return false
    if (status.energy < ENERGY_MOVE) return false
    return true
}

function afterMove() {
    if (PITFALL === map.raw[position.x][position.y]) status.trapped = true
    updateEnergy(-ENERGY_MOVE)
}

const robot = {
    position: positionLang,
    positionRaw: position,
    energy: energyLang,
    status,
    callback,
    
    up: new lang.NativeFunction(async () => {
        console.debug('Robot up', JSON.stringify(position))
        if (!beforeMove()) return
        if (position.y >= SIZE -1) return
        position.y++
        positionLang.value.y.value++
        afterMove()
        if (callback.move) await callback.move()
    }),
    down: new lang.NativeFunction(async () => {
        console.debug('Robot down', JSON.stringify(position))
        if (!beforeMove()) return
        if (position.y <= 0) return
        position.y--
        positionLang.value.y.value--
        afterMove()
        if (callback.move) await callback.move()
    }),
    right: new lang.NativeFunction(async () => {
        console.debug('Robot right', JSON.stringify(position))
        if (!beforeMove()) return
        if (position.x >= SIZE -1) return
        position.x++
        positionLang.value.x.value++
        afterMove()
        if (callback.move) await callback.move()
    }),
    left: new lang.NativeFunction(async () => {
        console.debug('Robot left', JSON.stringify(position))
        if (!beforeMove()) return
        if (position.x <= 0) return
        position.x--
        positionLang.value.x.value--
        afterMove()
        if (callback.move) await callback.move()
    }),

    avoid: new lang.NativeFunction(async () => {
        console.debug('Robot avoid', JSON.stringify(position))
        if (status.energy < ENERGY_AVOID) return
        status.trapped = false
        map.raw[position.x][position.y] = SAND
        updateEnergy(-ENERGY_AVOID)
        if (callback.move) await callback.move()
    }),

    charge: new lang.NativeFunction(async () => {
        console.debug('Robot charge', JSON.stringify(position))
        if (ENERGY === map.raw[position.x][position.y]) {
            status.charging = true
            map.raw[position.x][position.y] = SAND
            updateEnergy(ENERGY_CHARGE)
            if (callback.move) await callback.move()
        }
    }),

    reset: () => {
        position.x = ROBOT_X
        position.y = ROBOT_Y
        positionLang.value.x.value = position.x
        positionLang.value.y.value = position.y
        status.trapped = false
        status.energy = ENERGY_DEFAULT
        energyLang.value = status.energy
    }
}

const mapped = new lang.Object(robot)
mapped.isRobot = true
mapped.isProtected = true

// localization cs/de
robot['nahoru'] = robot.up
robot['hoch'] = robot.up
robot['dolů'] = robot.down
robot['runter'] = robot.down
robot['doprava'] = robot.right
robot['rechts'] = robot.right
robot['doleva'] = robot.left
robot['links'] = robot.left
robot['poloha'] = robot.position
robot['vyhnout'] = robot.avoid
robot['vermeiden'] = robot.avoid
robot['dobít'] = robot.charge
robot['aufladen'] = robot.charge
robot['energie'] = robot.energy

export default {
    raw: robot,
    mapped,
    reset: robot.reset,
}