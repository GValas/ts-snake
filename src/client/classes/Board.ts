import { Block } from './Block'
import { BlockColor } from '../enums/BlockColor'

export class Board {
    readonly BlockSize = 20
    readonly BoardSize = 20
    private readonly canv = document.querySelector<HTMLCanvasElement>('#gc')!
    private readonly ctxt = this.canv.getContext('2d')!

    randomObstacle(): Block {
        return new Block(
            Math.floor(Math.random() * this.BoardSize),
            Math.floor(Math.random() * this.BoardSize),
            BlockColor.Obstacle,
        )
    }

    drawBlocks(blocks: Block[]) {
        blocks.forEach((b) => this.drawBlock(b))
    }

    drawBlock(block: Block) {
        this.ctxt.fillStyle = block.color
        this.ctxt.fillRect(
            block.x * this.BlockSize,
            block.y * this.BlockSize,
            this.BlockSize - 2,
            this.BlockSize - 2,
        )
    }

    reset() {
        this.ctxt.fillStyle = BlockColor.Board
        this.ctxt.fillRect(0, 0, this.canv.width, this.canv.height)
    }
}
