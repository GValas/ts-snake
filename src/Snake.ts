import { Point } from './interfaces/Point'
import { Block } from './Block'
import { BlockColor } from './enums/BlockColor'

export class Snake {
    public headBlock = new Block(10, 10, BlockColor.Snake)
    private speed: Point = { x: -1, y: 0 }

    private readonly MinTailSize = 5
    public trail = Array<Block>()
    private tail = this.MinTailSize

    public setSpeed(x: number, y: number) {
        this.speed.x = x
        this.speed.y = y
    }

    public upScale() {
        this.tail++
    }

    public collideWith(obstacle: Block): boolean {
        return this.headBlock.is(obstacle)
    }

    public move(xMax: number, yMax: number) {
        this.headBlock.x += this.speed.x
        this.headBlock.y += this.speed.y
        if (this.headBlock.x < 0) {
            this.headBlock.x = xMax - 1
        } else if (this.headBlock.x > xMax - 1) {
            this.headBlock.x = 0
        } else if (this.headBlock.y < 0) {
            this.headBlock.y = yMax - 1
        } else if (this.headBlock.y > yMax - 1) {
            this.headBlock.y = 0
        }

        this.checkCollision()
    }

    private checkCollision() {
        for (const b of this.trail) {
            if (this.collideWith(b)) {
                this.tail = this.MinTailSize
            }
        }

        this.trail.push(this.headBlock.clone())
        while (this.trail.length > this.tail) {
            this.trail.shift()
        }
    }
}
