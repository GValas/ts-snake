import { Snake } from './Snake'
import { Board } from './Board'
import { NavigationKey } from './enums/Key'
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
                this.setSnakeSpeed(
                    pitch > 0 ? NavigationKey.Down : NavigationKey.Up,
                )
            } else if (
                Math.abs(roll) > this.minRotation &&
                Math.abs(roll) > Math.abs(pitch)
            ) {
                this.setSnakeSpeed(
                    roll > 0 ? NavigationKey.Right : NavigationKey.Left,
                )
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
                this.setSnakeSpeed(
                    dx > 0 ? NavigationKey.Right : NavigationKey.Left,
                )
            } else {
                this.setSnakeSpeed(
                    dy > 0 ? NavigationKey.Down : NavigationKey.Up,
                )
            }
        }
    }

    private touchStart(evt: TouchEvent) {
        if (this.isTouchScreenOn) {
            this.touchPt.x = evt.changedTouches[0].clientX
            this.touchPt.y = evt.changedTouches[0].clientY
        }
    }

    private setSnakeSpeed(key: string) {
        switch (key as NavigationKey) {
            case NavigationKey.Left:
                this.snake.setSpeed(-1, 0)
                break
            case NavigationKey.Up:
                this.snake.setSpeed(0, -1)
                break
            case NavigationKey.Right:
                this.snake.setSpeed(1, 0)
                break
            case NavigationKey.Down:
                this.snake.setSpeed(0, 1)
                break
        }
    }

    private keyPush(evt: KeyboardEvent) {
        this.setSnakeSpeed(evt.key)
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
