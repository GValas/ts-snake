import { Block } from './Block'
import { BlockColor } from './enums/BlockColor'
import { Collision } from './enums/ICollision'
import { IPoint } from './interfaces/Point'

export class Snake {
    private speed: IPoint = { x: -1, y: 0 }

    private readonly MinTailSize = 5
    trail = Array<Block>()

    private get head(): Block {
        return this.trail[this.trail.length - 1]
    }

    constructor(private boardSize: number) {
        this.reset()
    }

    setSpeed(x: number, y: number) {
        this.speed.x = x
        this.speed.y = y
    }

    get size(): number {
        return this.trail.length
    }

    private reset() {
        this.trail = [new Block(10, 10, BlockColor.Snake)]
    }

    private newHead(): Block {
        const newHead = this.head.clone()
        newHead.x += this.speed.x
        newHead.y += this.speed.y

        // borders topology
        if (newHead.x < 0) {
            newHead.x = this.boardSize - 1
        } else if (newHead.x > this.boardSize - 1) {
            newHead.x = 0
        } else if (newHead.y < 0) {
            newHead.y = this.boardSize - 1
        } else if (newHead.y > this.boardSize - 1) {
            newHead.y = 0
        }
        return newHead
    }

    move(obstacle: Block): Collision {
        // new head
        const newHead = this.newHead()

        // auto-collision
        if (this.trail.some(block => newHead.is(block))) {
            this.reset()
            return Collision.AutoCollision
        }

        // new block
        this.trail.push(newHead)

        // collision
        if (newHead.is(obstacle)) {
            return Collision.WithObstacle
        }

        // no collision at all
        if (this.trail.length > this.MinTailSize) {
            this.trail.shift()
        }
        return Collision.None
    }
}
