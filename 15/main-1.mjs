import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("input.txt")).trim().split("\n\n")

const GRID = INPUT[0].trim().split("\n").map(r => r.trim().split(""))
const MOVES = INPUT[1].split("\n").join("").trim().split("")

let pos = (function() {
    for (let y = 0; y < GRID.length; y++) {
        for (let x = 0; x < GRID[y].length; x++) {
            if (GRID[y][x] === "@") return { x, y }
        }
    }
    throw new Error()
})()

function at(p) {
    return GRID[p.y]?.[p.x]
}
function move(p, m) {
    const { x, y } = p
    switch (m) {
        case "^": return { x, y: y - 1 }
        case ">": return { x: x + 1, y }
        case "v": return { x, y: y + 1 }
        case "<": return { x: x - 1, y }
    }
    throw new Error(`Unknown: '${m}'`)
}

function tryPush(p, m) {
    if (at(p) !== "O") throw new Error()
    for (; at(p) === "O"; p = move(p, m));
    if (at(p) !== ".") return false
    return p
}

function score(grid) {
    let s = 0;
    for (let y=0; y<grid.length; y++) {
        for (let x=0; x<grid[y].length; x++) {
            if (grid[y][x] === "O") s += 100*y + x
        }
    }
    return s
}

for (const m of MOVES) {
    const nextP = move(pos, m)
    switch (at(nextP)) {
        case "#": break
        case "O":
            const pushedTo = tryPush(nextP, m)
            if (!pushedTo) {
                break;
            }
            GRID[pushedTo.y][pushedTo.x] = GRID[nextP.y][nextP.x]
        default:
            GRID[pos.y][pos.x] = "."
            GRID[nextP.y][nextP.x] = "@"
            pos = nextP;
            break
    }
}

console.log(GRID.map(row => row.join("")).join("\n"))
console.log("SCORE: ", score(GRID))
