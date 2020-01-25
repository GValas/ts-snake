import { Snake } from './Snake'
import { Board } from './Board'
import { Key } from './enums/Key'
import { Point } from './interfaces/Point'

export class Game {
    private obstacle = this.board.randomObstacle()
    private readonly RefreshRateMs = 100

    private touchPt: Point = { x: 0, y: 0 }

    constructor(private board: Board, private snake: Snake) {
        document.addEventListener('keydown', evt => this.keyPush(evt))
        document.addEventListener('touchstart', evt => this.touchStart(evt))
        document.addEventListener('touchend', evt => this.touchEnd(evt))
    }

    public start() {
        setInterval(() => this.refresh(), this.RefreshRateMs)
    }

    private touchEnd(evt: TouchEvent) {
        const dx = evt.changedTouches[0].clientX - this.touchPt.x
        const dy = evt.changedTouches[0].clientY - this.touchPt.y
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                this.setSnakeSpred(Key.Right)
            } else {
                this.setSnakeSpred(Key.Left)
            }
        } else {
            if (dy > 0) {
                this.setSnakeSpred(Key.Down)
            } else {
                this.setSnakeSpred(Key.Up)
            }
        }
    }

    private touchStart(evt: TouchEvent) {
        this.touchPt.x = evt.changedTouches[0].clientX
        this.touchPt.y = evt.changedTouches[0].clientY
    }

    private setSnakeSpred(key: Key) {
        switch (key) {
            case Key.Left:
                this.snake.setSpeed(-1, 0)
                break
            case Key.Up:
                this.snake.setSpeed(0, -1)
                break
            case Key.Right:
                this.snake.setSpeed(1, 0)
                break
            case Key.Down:
                this.snake.setSpeed(0, 1)
                break
        }
    }

    private keyPush(evt: { keyCode: number }) {
        this.setSnakeSpred(evt.keyCode)
    }

    private refresh() {
        // snake
        this.snake.move(this.board.BoardSize, this.board.BoardSize)
        if (this.snake.collideWith(this.obstacle)) {
            this.snake.upScale()
            this.obstacle = this.board.randomObstacle()
        }

        // board
        this.board.reset()
        this.snake.trail.forEach(b => this.board.drawBlock(b))
        this.board.drawBlock(this.obstacle)
    }
}
