import { readFileSync } from "node:fs"

const INPUT = String(readFileSync("input.txt")).trim()
const MACHINE_DATA = [...INPUT.matchAll(/Button A: X\+(\d+), Y\+(\d+)\n+Button B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)\n*/gy)]

class Control {
    constructor(dx, dy, cost) {
        this.cost = cost
        this.dx = dx
        this.dy = dy
    }
}
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
class Machine {
    constructor(id, a, b, p) {
        this.id = id
        this.a = a
        this.b = b
        this.p = p
    }

    solve() {
        let solution = null

        for (let da = 100; da >= 0; da--) {
            for (let db = 100; db >= 0; db--) {
                const x = this.a.dx * da + this.b.dx * db
                const y = this.a.dy * da + this.b.dy * db

                if (x === this.p.x && y === this.p.y && (!solution || solution.da * 3 + solution.db * 1 > da * 3 + db * 1)) {
                    solution = {da,db}
                }
            }
        }

        return solution
    }
}

let MACHINES = MACHINE_DATA
    .map(([_, a_dx, a_dy, b_dx, b_dy, p_x, p_y], i) => new Machine(
        i,
        new Control(Number(a_dx), Number(a_dy, 3), 3),
        new Control(Number(b_dx), Number(b_dy, 1), 1),
        new Point(Number(p_x), Number(p_y))
    ))

let total = 0

for (const m of MACHINES) {
    const x = m.solve()
    if (!x) {
        continue
    }

    console.log(m, "==>", x)

    total += x.da * 3 + x.db * 1
}

console.log(total)
