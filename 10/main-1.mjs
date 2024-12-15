import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("input.txt")).trim().split('\n')
for (let i = 0; i < INPUT.length; i++) {
    INPUT[i] = INPUT[i].split('').map(x => Number(x))
}

let total = 0

const ALL = {}
for (let i = 0; i < INPUT.length; i++) {
    for (let j = 0; j < INPUT[i].length; j++) {
        const found = {}
        calcScore(i, j, 0, found, [])

        total += Object.keys(found).length
    }
}

function calcScore(i, j, n, finds, a) {
    // out of bounds
    if (i < 0 || i >= INPUT.length || j < 0 || j >= INPUT[i].length) {
        return
    }
    // not what we are looking for
    if (INPUT[i][j] !== n) {
        return
    }

    const posStr = "(" + i + "," + j + ")"
    a = a.concat([posStr])

    // The end
    if (n === 9 ) {
        finds[posStr] = true
        return
    }

    // try all directions:
    calcScore(i-1, j, n+1, finds, a)
    calcScore(i+1, j, n+1, finds, a)
    calcScore(i, j-1, n+1, finds, a)
    calcScore(i, j+1, n+1, finds, a)
}

console.log(total)
