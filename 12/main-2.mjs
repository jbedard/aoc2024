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
        includes: Object.create(null),
        minX: x,
        maxX: x,
        minY: y,
        maxY: y,
        blocks: 0,

        height() {
            return this.maxY - this.minY + 1
        },
        width() {
            return this.maxX - this.minX + 1
        },
        is(y, x) {
            if (y < 0 || y >= this.height()) return false
            if (x < 0 || x >= this.width()) return false
            if (!this.includes[`${this.minY+y},${this.minX+x}`]) return false
            return G[this.minY + y][this.minX + x] === this.type
        }
    })

    score += calcScore(group)
  }
}

console.log(score)

function calcScore(group) {
    let corners = 0

    for (let x = 0; x < group.width(); x++) {
        for (let y = 0; y < group.height(); y++) {
            if (group.is(y, x)) {
                // top left outer
                if (!group.is(y-1, x) && !group.is(y, x-1) && !group.is(y-1, x-1)) {
                    corners++
                }
                // top right outer
                if (!group.is(y-1, x) && !group.is(y, x+1) && !group.is(y-1, x+1)) {
                    corners++
                }
                // bottom left outer
                if (!group.is(y+1, x) && !group.is(y, x-1) && !group.is(y+1, x-1)) {
                    corners++
                }
                // bottom right outer
                if (!group.is(y+1, x) && !group.is(y, x+1) && !group.is(y+1, x+1)) {
                    corners++
                }
            } else {
                // top left inner
                if (group.is(y-1, x) && group.is(y, x-1)) {
                    corners++
                }
                // top right inner
                if (group.is(y-1, x) && group.is(y, x+1)) {
                    corners++
                }
                // bottom left inner
                if (group.is(y+1, x) && group.is(y, x-1)) {
                    corners++
                }
                // bottom right inner
                if (group.is(y+1, x) && group.is(y, x+1)) {
                    corners++
                }
            }
        }
    }

    console.log(group.type, group.blocks, "\t", corners, "\t", group.blocks * corners)

    return group.blocks * corners
}

function traverse(y, x, b) {
    // Done already
    if (DONE[y] && DONE[y][x]) return b

    // Mark as done
    DONE[y] ??= Object.create(null)
    DONE[y][x] = true

    b.minX = Math.min(b.minX, x)
    b.maxX = Math.max(b.maxX, x)
    b.minY = Math.min(b.minY, y)
    b.maxY = Math.max(b.maxY, y)

    b.includes[`${y},${x}`] = true
    b.blocks += 1

    if (G[y-1] && G[y-1][x] === b.type) {
        traverse(y-1, x, b)
    }
    if (G[y+1] && G[y+1][x] === b.type) {
        traverse(y+1, x, b)
    }
    if (G[y][x-1] === b.type) {
        traverse(y, x-1, b)
    }
    if (G[y][x+1] === b.type) {
        traverse(y, x+1, b)
    }

    return b
}
