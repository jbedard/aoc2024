import { readFileSync } from "node:fs"

const a1 = [], a2 = []

const INPUT = String(readFileSync("input.txt")).trim()

for (const x of INPUT.split("\n")) {
  const [a,b] = x.split(/\s+/)
  a1.push(parseInt(a))
  a2.push(parseInt(b))
}
a1.sort()
a2.sort()

// Part1
const totalDiff = a1.map((a,i) => Math.abs(a-a2[i]))
console.log(totalDiff)

// Part2
const occurrences = a1.map(x => x * a2.filter(y => y === x).length)
const totalOccurrences = occurrences.reduce((a,b) => a+b)
console.log(totalOccurrences)
