import { Snake } from './Snake'
import { Board } from './Board'
import { Key } from './enums/Key'
import { Point } from './interfaces/Point'

export class Game {
    private obstacle = this.board.randomObstacle()
    private readonly RefreshRateMs = 100

    private touchPt: Point = { x: 0, y: 0 }

    private minRotation = 80

    get isTouchScreenOn(): boolean {
        const radio = document.querySelector(
            'input[name=controler-type]:checked',
        ) as HTMLInputElement
        return radio.id === 'touch'
    }

    constructor(private board: Board, private snake: Snake) {
        document.addEventListener('keydown', evt => this.keyPush(evt))
        document.addEventListener('touchstart', evt => this.touchStart(evt))
        document.addEventListener('touchend', evt => this.touchEnd(evt))
        window.addEventListener('devicemotion', evt => this.motionHandler(evt))
    }

    private motionHandler(evt: DeviceMotionEvent) {
        if (!this.isTouchScreenOn) {
            const roll = evt.rotationRate?.beta! // roulis
            const pitch = evt.rotationRate?.alpha! // tangage

            if (
                Math.abs(pitch) > this.minRotation &&
                Math.abs(pitch) > Math.abs(roll)
            ) {
                this.setSnakeSpeed(pitch > 0 ? Key.Down : Key.Up)
            } else if (
                Math.abs(roll) > this.minRotation &&
                Math.abs(roll) > Math.abs(pitch)
            ) {
                this.setSnakeSpeed(roll > 0 ? Key.Right : Key.Left)
            }
        }
    }

    public start() {
        setInterval(() => this.refresh(), this.RefreshRateMs)
    }

    private touchEnd(evt: TouchEvent) {
        if (this.isTouchScreenOn) {
            const dx = evt.changedTouches[0].clientX - this.touchPt.x
            const dy = evt.changedTouches[0].clientY - this.touchPt.y
            if (Math.abs(dx) > Math.abs(dy)) {
                this.setSnakeSpeed(dx > 0 ? Key.Right : Key.Left)
            } else {
                this.setSnakeSpeed(dy > 0 ? Key.Down : Key.Up)
            }
        }
    }

    private touchStart(evt: TouchEvent) {
        if (this.isTouchScreenOn) {
            this.touchPt.x = evt.changedTouches[0].clientX
            this.touchPt.y = evt.changedTouches[0].clientY
        }
    }

    private setSnakeSpeed(key: Key) {
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
        this.setSnakeSpeed(evt.keyCode)
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
