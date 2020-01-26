import { BlockColor } from './enums/BlockColor'
import { ICloneable } from './interfaces/Cloneable'
import { IComparable } from './interfaces/Comparable'
import { IPoint } from './interfaces/Point'

export class Block implements IPoint, IComparable<Block>, ICloneable<Block> {
    clone(): Block {
        return new Block(this.x, this.y, this.color)
    }
    sameAs(t: Block): boolean {
        return this.x === t.x && this.y === t.y
    }
    constructor(public x: number, public y: number, public color: BlockColor) {}
}
