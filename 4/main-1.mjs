import { readFileSync } from "node:fs"

const X = String(readFileSync("input.txt")).trim().split('\n')
for (let i = 0; i < X.length; i++) {
    X[i] = X[i].split('')
}

const W = ["X", "M", "A", "S"]

const P = [
    // down
    [[0, +1, +2, +3], [0, 0, 0, 0]],
    // up
    [[0, -1, -2, -3], [0, 0, 0, 0]],
    // right
    [[0, 0, 0, 0], [0, +1, +2, +3]],
    // left
    [[0, 0, 0, 0], [0, -1, -2, -3]],
    // down left
    [[0, +1, +2, +3], [0, -1, -2, -3]],
    // up left
    [[0, -1, -2, -3], [0, -1, -2, -3]],
    // down right
    [[0, +1, +2, +3], [0, +1, +2, +3]],
    // up right
    [[0, -1, -2, -3], [0, +1, +2, +3]],
]

let count = 0;
for (let i = 0; i < X.length; i++) {
    for (let j = 0; j < X[i].length; j++) {
        for (let p = 0; p < P.length; p++) {
            if (checkPath(i, j, p)) {
                count++
            }
        }
    }
}

function checkPath(i, j, p) {
    for (let c = 0; c < 4; c++) {
        if (!X[i+P[p][0][c]] || !X[i+P[p][0][c]][j+P[p][1][c]]) {
            return false
        }
        if (X[i+P[p][0][c]][j+P[p][1][c]] !== W[c]) {
            return false
        }
    }
    return true
}

console.log(count)
