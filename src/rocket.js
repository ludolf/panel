import { lang } from 'ludolfc'
import { ROCKET_X, ROCKET_Y } from './constants'
import robot from './robot'

const MIN_ENERGY = 100

const r = robot.raw

const position = { x: ROCKET_X, y: ROCKET_Y }
const positionLang = new lang.Object({
    x: new lang.Number(position.x),
    y: new lang.Number(position.y),
})
const callback = {
    position: () => console.log('robot is not in the same position'),
    energy:   () => console.log('not enough energy'),
    start:    () => console.log('rocket is starting!!!'),
}

const rocket = {
    position: positionLang,
    positionRaw: position,
    callback,

    start: new lang.NativeFunction(async () => {
        console.debug('Rocket start', r.status.energy, position)
        if (r.positionRaw.x !== position.x || r.positionRaw.y !== position.y) return await callback.position()
        if (r.status.energy < MIN_ENERGY) return await callback.energy()
        await callback.start()
    }),
}

const mapped = new lang.Object(rocket)
mapped.isRocket = true
mapped.isProtected = true

// localization cs/de
rocket['poloha'] = rocket.position

export default {
    raw: rocket,
    mapped,
    MIN_ENERGY,
}