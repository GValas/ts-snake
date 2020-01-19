import { Point } from './interfaces/Point'
import { Block } from './Block'

export class Snake {
    public headPt = new Block(10, 10)
    private speedPt: Point = { x: -1, y: 0 }
    private readonly MinTailSize = 5
    private trail = Array<Block>()
    private tail = this.MinTailSize
    public setSpeed(x: number, y: number) {
        this.speedPt.x = x
        this.speedPt.y = y
    }
    public upScale() {
        this.tail++
    }
    public move(xMax: number, yMax: number) {
        this.headPt.x += this.speedPt.x
        this.headPt.y += this.speedPt.y
        if (this.headPt.x < 0) {
            this.headPt.x = xMax - 1
        } else if (this.headPt.x > xMax - 1) {
            this.headPt.x = 0
        } else if (this.headPt.y < 0) {
            this.headPt.y = yMax - 1
        } else if (this.headPt.y > yMax - 1) {
            this.headPt.y = 0
        }
    }
}
