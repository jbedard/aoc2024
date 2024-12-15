import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("input.txt")).trim()

const a = INPUT.split(/\s+/).map(Number)
const c = Array(75).fill().map(() => Object.create(null))
const n = a.reduce((n, x) => n + calc(x, 0), 0)

function calc(n, r) {
    if (r === 75) return 1
    if (c[r][n]) return c[r][n]
    if (n === 0) return c[r][n] = calc(1, r+1)

    const digits = Math.floor(Math.log10(n)+1)
    if (digits % 2 === 0) {
        const p = Math.pow(10, digits/2)
        const n1 = Math.floor(n / p)
        const n2 = n % p
        return c[r][n] = calc(n1, r+1) + calc(n2, r+1)
    }

    return c[r][n] = calc(n * 2024, r+1)
}

console.log(n)
