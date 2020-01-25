import { BlockColor } from './enums/BlockColor'
import { Block } from './Block'

export class Board {
    public readonly BlockSize = 20
    public readonly BoardSize = 20
    private canv: HTMLCanvasElement
    private ctxt: CanvasRenderingContext2D

    randomObstacle(): Block {
        return new Block(
            Math.floor(Math.random() * this.BoardSize),
            Math.floor(Math.random() * this.BoardSize),
            BlockColor.Obstacle,
        )
    }
    constructor() {
        this.canv = document.querySelector<HTMLCanvasElement>('#gc')!
        this.ctxt = this.canv.getContext('2d')!
    }
    public drawBlock(block: Block) {
        this.ctxt.fillStyle = block.color
        this.ctxt.fillRect(
            block.x * this.BlockSize,
            block.y * this.BlockSize,
            this.BlockSize - 2,
            this.BlockSize - 2,
        )
    }
    public reset() {
        this.ctxt.fillStyle = BlockColor.Board
        this.ctxt.fillRect(0, 0, this.canv.width, this.canv.height)
    }
}
