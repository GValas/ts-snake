import { Point } from './interfaces/Point'
import { Comparable } from './interfaces/Comparable'
import { Cloneable } from './interfaces/Cloneable'

export class Block implements Point, Comparable<Block>, Cloneable<Block> {
    clone(): Block {
        return new Block(this.x, this.y)
    }
    is(t: Block): boolean {
        return this.x === t.x && this.y === t.y
    }
    constructor(public x: number, public y: number) {}
}
