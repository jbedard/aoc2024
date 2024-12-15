import { readFileSync } from "node:fs"

const X = String(readFileSync("input.txt")).trim().split('\n')
for (let i = 0; i < X.length; i++) {
    X[i] = X[i].split('')
}

let count = 0;
for (let i = 0; i < X.length; i++) {
    for (let j = 0; j < X[i].length; j++) {
        if (check1(i, j) || check2(i, j) || check3(i, j) || check4(i, j)) {
            count++
        }
    }
}

// M S
//  A
// M S
function check1(i, j) {
    if (X[i][j] !== "M" || X[i][j+2] != "S") {
        return false
    }
    if (!X[i+1] || X[i+1][j+1] !== "A") {
        return false
    }
    if (!X[i+2] || X[i+2][j] !== "M" || X[i+2][j+2] != "S") {
        return false
    }
    return true
}
// S S
//  A
// M M
function check2(i, j) {
    if (X[i][j] !== "S" || X[i][j+2] != "S") {
        return false
    }
    if (!X[i+1] || X[i+1][j+1] !== "A") {
        return false
    }
    if (!X[i+2] || X[i+2][j] !== "M" || X[i+2][j+2] != "M") {
        return false
    }
    return true
}
// S M
//  A
// M S
function check3(i, j) {
    if (X[i][j] !== "S" || X[i][j+2] != "M") {
        return false
    }
    if (!X[i+1] || X[i+1][j+1] !== "A") {
        return false
    }
    if (!X[i+2] || X[i+2][j] !== "S" || X[i+2][j+2] != "M") {
        return false
    }
    return true
}
// M M
//  A
// S S
function check4(i, j) {
    if (X[i][j] !== "M" || X[i][j+2] != "M") {
        return false
    }
    if (!X[i+1] || X[i+1][j+1] !== "A") {
        return false
    }
    if (!X[i+2] || X[i+2][j] !== "S" || X[i+2][j+2] != "S") {
        return false
    }
    return true
}

console.log(count)
