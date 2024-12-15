import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("input.txt")).trim()

let a = INPUT.split(/\s+/).map(Number)

for (let r = 0; r < 25; r++) {
    a = a.map(expand).flat()
}

function expand(x) {
    const s = String(x)
    if (x === 0) return 1
    if (s.length % 2 == 0) return [s.slice(0, s.length/2), s.slice(s.length/2)].map(Number)
    return x * 2024
}

console.log(a.length)
