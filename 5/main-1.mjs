import { readFileSync } from "node:fs"

const [INPUT1, INPUT2] = String(readFileSync("input.txt")).trim().split("\n\n")

const ORDER = INPUT1.split("\n")
    .map(line => line.split("|").map(Number))
    .reduce((m, [a, b]) => {
        (m[a] ??= []).push(b)
        return m
    }, Object.create(null))

const UPDATES = INPUT2.split("\n").map(line => line.split(",").map(Number))
const ORDERED = UPDATES.map(update => update.slice().sort((a, b) => {
    if (b in ORDER) {
        for (const postB of ORDER[b]) {
            if (a === postB) {
                return +1
            }
        }
    }
    if (a in ORDER) {
        for (const postA of ORDER[a]) {
            if (b === postA) {
                return -1
            }
        }
    }
    return 0
}))

// Only difference between part1+2 is swapping the true/false return value for the reverse filter condition
const NON_UPDATED = ORDERED.filter((ordered, oIndex) => {
    for (let i = 0; i < ordered.length; i++) {
        if (UPDATES[oIndex][i] !== ordered[i]) {
            return false
        }
    }
    return true
})

console.log(NON_UPDATED.reduce((n, a) => {
    return n + a[Math.floor(a.length/2)]
}, 0))
