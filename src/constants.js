const SIZE = 11
const RADIUS = Math.floor(SIZE / 2)

const SAND = 0
const ROBOT = 1
const ROCKET = 20
const PITFALL = 30
const ENERGY = 40

const ROCKET_X = RADIUS
const ROCKET_Y = RADIUS

const ROBOT_X = RADIUS
const ROBOT_Y = RADIUS - 1

export {
    SIZE, RADIUS, SAND, ROBOT, ROCKET, PITFALL, ENERGY,
    ROCKET_X, ROCKET_Y, ROBOT_X, ROBOT_Y,
}