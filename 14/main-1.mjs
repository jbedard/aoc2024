import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("input.txt")).trim()

const ROBOTS = INPUT.split("\n")
    .map(line => line.match(/^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/).slice(1))
    .map(a => a.map(Number))
    .map(a => {
        const [x, y, vx, vy] = a
        return {x, y, vx, vy}
    })

const W = 101
const H = 103
// const W = 11
// const H = 7

for (let i = 0; i < 100; i++) {
    for (const robot of ROBOTS) {
        robot.x = (W + robot.x + robot.vx) % W
        robot.y = (H + robot.y + robot.vy) % H
    }
}
printRoom()

function printRoom() {
    let grid = new Array(H).fill(0).map(() => new Array(W).fill(0))

    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            grid[y][x] = ROBOTS.reduce((n, robot) => n + (robot.x === x && robot.y === y ? 1 : 0), 0) || "."
        }
        console.log(grid[y].join(""))
    }
    process.stdout.write("\n")
    console.log("Safety factor: ", safetyFactor())
}

function safetyFactor() {
    const qW = Math.floor(W / 2)
    const qH = Math.floor(H / 2)

    const qScores = [[0, 0], [0, 0]]
    for (const robot of ROBOTS) {
        if (robot.x < qW && robot.y < qH) qScores[0][0]++
        if (robot.x < qW && robot.y > qH) qScores[0][1]++
        if (robot.x > qW && robot.y < qH) qScores[1][0]++
        if (robot.x > qW && robot.y > qH) qScores[1][1]++
    }

    return qScores[0][0] * qScores[0][1] * qScores[1][0] * qScores[1][1]
}
