import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("input.txt")).trim()

const G = INPUT.split("\n").map((line) => line.split(""))

const DONE = Object.create(null)
let score = 0

for (let y = 0; y < G.length; y++) {
  for (let x = 0; x < G[y].length; x++) {
    if (DONE[y] && DONE[y][x]) continue

    const group = traverse(y, x, {
        type: G[y][x],
        blocks: 0,
        perimeter: 0
    })

    score += calcScore(group)
  }
}

console.log(score)

function calcScore(group) {
    return group.blocks * group.perimeter
}

function traverse(y, x, b) {
    // Done already
    if (DONE[y] && DONE[y][x]) return b

    // Mark as done
    DONE[y] ??= Object.create(null)
    DONE[y][x] = true

    b.blocks += 1
    b.perimeter += 4

    if (G[y-1] && G[y-1][x] === b.type) {
        b.perimeter--
        traverse(y-1, x, b)
    }
    if (G[y+1] && G[y+1][x] === b.type) {
        b.perimeter--
        traverse(y+1, x, b)
    }
    if (G[y][x-1] === b.type) {
        b.perimeter--
        traverse(y, x-1, b)
    }
    if (G[y][x+1] === b.type) {
        b.perimeter--
        traverse(y, x+1, b)
    }

    return b
}
