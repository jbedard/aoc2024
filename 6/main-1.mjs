import { readFileSync } from "node:fs"

const GRID = String(readFileSync("input.txt")).trim().split("\n").map(row => row.split(""))

const p = (function() {
    for (let y = 0; y < GRID.length; y++) {
        for (let x = 0; x < GRID[y].length; x++) {
            if (GRID[y][x] === "^") return { x, y }
        }
    }
    throw new Error()
})()
const a = { x: 0, y: -1 }


const visited = new Set()

while (p.y >= 0 && p.y < GRID.length && p.x >= 0 && p.x < GRID[p.y].length) {
    visited.add(`${p.x},${p.y}`)

    if (GRID[p.y + a.y] && GRID[p.y + a.y][p.x + a.x] === "#") {
        if (a.x === 0 && a.y === 1) {
            a.x = -1
            a.y = 0
        } else if (a.x === 0 && a.y === -1) {
            a.x = 1
            a.y = 0
        } else if (a.x === 1 && a.y === 0) {
            a.x = 0
            a.y = 1
        } else if (a.x === -1 && a.y === 0) {
            a.x = 0
            a.y = -1
        }
    } else {
        p.x += a.x
        p.y += a.y
    }
}

console.log(visited.size)
