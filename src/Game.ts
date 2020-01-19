import { Snake } from './Snake'
import { Board } from './Board'
import { Key } from './enums/Key'

export class Game {
    private obstacle = this.board.randomObstacle()
    private readonly RefreshRateMs = 100

    constructor(private board: Board, private snake: Snake) {
        document.addEventListener('keydown', evt => this.keyPush(evt))
    }

    public start() {
        setInterval(() => this.refresh(), this.RefreshRateMs)
    }

    private keyPush(evt: { keyCode: number }) {
        switch (evt.keyCode) {
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
