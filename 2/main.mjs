import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("input.txt")).trim().split("\n").map(n => n.split(/\s+/).map(x => Number(x)))

function isSafe(levels) {
    if (!levels.every((level, i) => i === 0 || levels[i-1] !== level)) return false
    if (levels.some((level, i) => i !== 0 && Math.abs(levels[i-1] - level) > 3)) return false
    if (levels.every((level, i) => i === 0 || levels[i-1] > level)) return true
    if (levels.every((level, i) => i === 0 || levels[i-1] < level)) return true
    return false
}

const safe = INPUT.filter(levels => {
    if (isSafe(levels)) return true

    for (let i = 0; i < levels.length; i++) {
        const temp = [...levels]
        temp.splice(i, 1)
        if (isSafe(temp)) return true
    }

    return false
})

// Part1
const safeCount = safe.length // CORRECT: 230

// Part2


console.log(safeCount)
