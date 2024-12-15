import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("15/input.txt")).trim().split("\n\n")

const GRID = INPUT[0]
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replaceAll("@", "@.")
    .trim().split("\n").map(r => r.trim().split(""))
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

function tryPush(p, m, moves, movedAlready = Object.create(null)) {
    if (movedAlready[`${p.x},${p.y}`]) {
        return true
    }
    movedAlready[`${p.x},${p.y}`] = true

    const c = at(p)

    // Not something to push, either blocked or done
    if (c !== "[" && c !== "]") {
        return c === "."
    }

    // Horizontal pushes can't grow and are easy
    if (m === "<" || m === ">") {
        // TODO: recursion not necessary
        const hn = move(p, m)
        if (tryPush(hn, m, moves, movedAlready)) {
            moves.push(hn)
            return true
        }
        return false
    }

    // Try pushing this block
    const n = move(p, m)
    if (!movedAlready[`${n.x},${n.y}`]) {
        if (!tryPush(n, m, moves, movedAlready)) {
            return false
        }
        moves.push(n)
    }

    // Try pushing the block beside this one
    const p2 = {x: p.x + (c === "[" ? +1 : -1), y: p.y}
    if (!movedAlready[`${p2.x},${p2.y}`]) {
        if (!tryPush(p2, m, moves, movedAlready)) {
            return false
        }

        moves.push(p2)
    }
    return true
}

function score(grid) {
    let s = 0;
    for (let y=0; y<grid.length; y++) {
        for (let x=0; x<grid[y].length; x++) {
            if (grid[y][x] === "[") s += 100*y + x
        }
    }
    return s
}

function toString() {
    return GRID.map(row => row.join("")).join("\n")
}

function isValid(grid) {
    return grid.every(row => !row.join("").match(/(\[\[|\]\]|\[\.|\.\])/))
}

for (let i = 0; i < MOVES.length; i++) {
    if (!isValid(GRID)) {
        console.log(`MOVE: ${i-1}\n\n${toString()}`)
        throw new Error()
    }
    const m = MOVES[i]
    const nextP = move(pos, m)
    switch (at(nextP)) {
        case "#":
            break
        case "[":
        case "]":
            const pushes = [pos, nextP]
            if (!tryPush(nextP, m, pushes)) {
                break
            }

            // Hack to record the values being moved before updating the grid
            const rev = m === "^" ? "v" : (m === "v" ? "^" : (m === "<" ? ">" : "<"))
            const changes = pushes.map(p => {
                const before = move(p, rev)
                if (pushes.some(p2 => p2.x === before.x && p2.y === before.y)) {
                    return {p, c: at(before)}
                }
                return {p, c: "."}
            })

            for (const { p, c } of changes) {
                GRID[p.y][p.x] = c
            }
        default:
            GRID[pos.y][pos.x] = "."
            GRID[nextP.y][nextP.x] = "@"
            pos = nextP;
            break
    }
}

console.log(GRID.map(row => row.join("")).join("\n"))
console.log("SCORE: ", score(GRID))
