import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("input.txt")).trim().split('\n')
for (let i = 0; i < INPUT.length; i++) {
    INPUT[i] = INPUT[i].split('').map(x => Number(x))
}

let total = 0

const ALL = {}
for (let i = 0; i < INPUT.length; i++) {
    for (let j = 0; j < INPUT[i].length; j++) {
        const f = calcScore(i, j, 0, [])

        total += f
    }
}

function calcScore(i, j, n, a) {
    // out of bounds
    if (i < 0 || i >= INPUT.length || j < 0 || j >= INPUT[i].length) {
        return 0
    }
    // not what we are looking for
    if (INPUT[i][j] !== n) {
        return 0
    }

    const posStr = "(" + i + "," + j + ")"
    a = a.concat([posStr])

    // The end
    if (n === 9 ) {
        return 1
    }

    // try all directions:
    const up = calcScore(i-1, j, n+1, a)
    const down = calcScore(i+1, j, n+1, a)
    const left = calcScore(i, j-1, n+1, a)
    const right = calcScore(i, j+1, n+1, a)

    return up + down + left + right
}

console.log(total)
