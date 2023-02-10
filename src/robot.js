import { lang } from 'ludolfc'
import { SIZE, RADIUS } from './constants'

const position = { x: RADIUS, y: RADIUS + 1 }
const callback = {
    move: null,
}

const robot = {
    position,
    callback,
    
    up: new lang.NativeFunction(async () => {
        console.debug('Robot up')
        position.y++
        if (callback.move) await callback.move()
    }),
    down: new lang.NativeFunction(async () => {
        console.debug('Robot down')
        position.y--
        if (callback.move) await callback.move()
    }),
    right: new lang.NativeFunction(async () => {
        console.debug('Robot right')
        position.x++
        if (callback.move) await callback.move()
    }),
    left: new lang.NativeFunction(async () => {
        console.debug('Robot left')
        position.x--
        if (callback.move) await callback.move()
    }),
}

const mapped = new lang.Object(robot)
mapped.isRobot = true
mapped.isProtected = true

// localization cs/de
robot['nahoru'] = robot.up
robot['nachOben'] = robot.up
robot['dolů'] = robot.down
robot['nachUnten'] = robot.down
robot['vpravo'] = robot.right
robot['rechts'] = robot.right
robot['vlevo'] = robot.left
robot['links'] = robot.left

const reset = () => { 
    position.x = RADIUS
    position.y = RADIUS + 1 
}

export default {
    raw: robot,
    mapped,
    reset,
}