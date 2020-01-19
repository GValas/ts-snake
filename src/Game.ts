import { BlockColor } from './BlockColor'
import { Block } from './Block'
import { Snake } from './Snake'
import { Board } from './Board'

export class Game {
    private obstaclePt = new Block(15, 15)
    private readonly RefreshRateMs = 100
    public start() {
        setInterval(() => this.refresh(), this.RefreshRateMs)
    }
    constructor(private board: Board, private snake: Snake) {
        document.addEventListener('keydown', evt => this.keyPush(evt))
    }
    private keyPush(evt: { keyCode: number }) {
        switch (evt.keyCode) {
            case 37:
                this.snake.setSpeed(-1, 0)
                break
            case 38:
                this.snake.setSpeed(0, -1)
                break
            case 39:
                this.snake.setSpeed(1, 0)
                break
            case 40:
                this.snake.setSpeed(0, 1)
                break
        }
    }
    private refresh() {
        this.board.reset()
        this.snake.move(this.board.BoardSize, this.board.BoardSize)
        const pts: Point[] = [] // sanke trail
        for (const pt of pts) {
            this.board.drawBlock(BlockColor.Snake, pt)
            // collision => reset trail
            //if (pt.is(this.headPt)) {
            // if (pt.is(this.headPt)) {
            //     this.tail = Game.MinTailSize
            // }
        }
        this.snake.selfCollide()
        this.trail.push(this.headPt.clone())
        while (this.trail.length > this.tail) {
            this.trail.shift()
        }
        // impact, add new element in the tail and pick up a new target block
        if (this.snake.collideWith(this.obstaclePt)) {
            this.snake.upScale()
            this.obstaclePt = this.board.randomBlock()
        }
        this.board.drawBlock(BlockColor.Obstacle, this.obstaclePt)
    }
}
