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

while (true) {
    for (const robot of ROBOTS) {
        robot.x = (W + robot.x + robot.vx) % W
        robot.y = (H + robot.y + robot.vy) % H
    }

    if (toString().includes("1111111111111111111111111111111")) {
        console.log(toString())
        console.log("Seconds: ", i)
        console.log("BUT IT'S THE NEXT ONE!?")
        break
    }
}

function toString() {
    let grid = new Array(H).fill(0).map(() => new Array(W).fill(0))

    let s = []

    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            grid[y][x] = ROBOTS.reduce((n, robot) => n + (robot.x === x && robot.y === y ? 1 : 0), 0) || " "
        }
        s.push(grid[y].join(""))
    }
    return s.join("\n")
}
