import { lang } from 'ludolfc'
import { SIZE, RADIUS, PITFALL } from './constants'
import map from './map'

const position = { x: RADIUS, y: RADIUS - 1 }
const positionLang = new lang.Object({
    x: new lang.Number(position.x),
    y: new lang.Number(position.y),
})
const callback = {
    move: null,
}
const status = {
    trapped: false
}

function beforeMove() {    
    if (status.trapped) return false
    return true
}

function afterMove() {
    if (PITFALL === map.raw[position.y][position.x]) {
        status.trapped = true
    }
}

const robot = {
    position: positionLang,
    positionRaw: position,
    callback,
    status,
    
    up: new lang.NativeFunction(async () => {
        console.debug('Robot up')
        if (!beforeMove()) return
        if (position.y >= SIZE -1) return
        position.y++
        positionLang.value.y.value++
        afterMove()
        if (callback.move) await callback.move()
    }),
    down: new lang.NativeFunction(async () => {
        console.debug('Robot down')
        if (!beforeMove()) return
        if (position.y <= 0) return
        position.y--
        positionLang.value.y.value--
        afterMove()
        if (callback.move) await callback.move()
    }),
    right: new lang.NativeFunction(async () => {
        console.debug('Robot right')
        if (!beforeMove()) return
        if (position.x >= SIZE -1) return
        position.x++
        positionLang.value.x.value++
        afterMove()
        if (callback.move) await callback.move()
    }),
    left: new lang.NativeFunction(async () => {
        console.debug('Robot left')
        if (!beforeMove()) return
        if (position.x <= 0) return
        position.x--
        positionLang.value.x.value--
        afterMove()
        if (callback.move) await callback.move()
    }),

    avoid: new lang.NativeFunction(async () => {
        console.debug('Robot avoid')
        status.trapped = false
        if (callback.move) await callback.move()
    }),

    reset: () => {
        position.x = RADIUS
        position.y = RADIUS - 1
        positionLang.value.x.value = position.x
        positionLang.value.y.value = position.y
        status.trapped = false
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

export default {
    raw: robot,
    mapped,
    reset: robot.reset,
}