import { Board } from './Board'
import { Collision } from './enums/Collision'
import { GameControl } from './enums/GameControl'
import { IPoint } from './interfaces/Point'
import { NavKey } from './enums/NavKey'
import { Snake } from './Snake'

export class Game {
    private readonly RefreshRateMs = 100
    private readonly gyroSensitivity = 80

    private score = document.querySelector<HTMLDivElement>('#score')!
    private time = document.querySelector<HTMLDivElement>('#time')!
    private obstacle = this.board.randomObstacle()
    private touchPt: IPoint = { x: 0, y: 0 }
    private elapsedTime = 0

    private get controlType(): GameControl {
        const radio = document.querySelector(
            'input[name=game-controler]:checked',
        ) as HTMLInputElement
        return radio.id as GameControl
    }

    constructor(private board: Board, private snake: Snake) {
        document.addEventListener('keydown', (evt) => this.keyPush(evt))
        document.addEventListener('touchstart', (evt) => this.touchStart(evt))
        document.addEventListener('touchend', (evt) => this.touchEnd(evt))
        window.addEventListener('devicemotion', (evt) =>
            this.motionHandler(evt),
        )
        window.addEventListener('deviceorientation', (evt) =>
            this.orientationHandler(evt),
        )
    }

    private orientationHandler(evt: DeviceOrientationEvent) {
        if (this.controlType === GameControl.GyroPosition) {
            const pitch = evt?.beta! // tangage (ailes)
            const roll = evt?.gamma! // roulis

            if (pitch < 0) {
                this.setSnakeSpeed(NavKey.Up)
            } else if (pitch > 20) {
                this.setSnakeSpeed(NavKey.Down)
            }

            if (roll < -5) {
                this.setSnakeSpeed(NavKey.Left)
            } else if (roll > 5) {
                this.setSnakeSpeed(NavKey.Right)
            }
        }
    }

    private motionHandler(evt: DeviceMotionEvent) {
        if (this.controlType === GameControl.GyroAcceleration) {
            const pitch = evt.rotationRate?.alpha! //  tangage (ailes)
            const roll = evt.rotationRate?.beta! // roulis

            if (Math.abs(pitch) > Math.abs(roll)) {
                if (Math.abs(pitch) > this.gyroSensitivity) {
                    this.setSnakeSpeed(pitch > 0 ? NavKey.Down : NavKey.Up)
                }
            } else {
                if (Math.abs(roll) > this.gyroSensitivity) {
                    this.setSnakeSpeed(roll > 0 ? NavKey.Right : NavKey.Left)
                }
            }
        }
    }

    start() {
        setInterval(() => this.refresh(), this.RefreshRateMs)
    }

    private touchEnd(evt: TouchEvent) {
        if (this.controlType === GameControl.TouchScreen) {
            const dx = evt.changedTouches[0].clientX - this.touchPt.x
            const dy = evt.changedTouches[0].clientY - this.touchPt.y
            if (Math.abs(dx) > Math.abs(dy)) {
                this.setSnakeSpeed(dx > 0 ? NavKey.Right : NavKey.Left)
            } else {
                this.setSnakeSpeed(dy > 0 ? NavKey.Down : NavKey.Up)
            }
        }
    }

    private touchStart(evt: TouchEvent) {
        if (this.controlType === GameControl.TouchScreen) {
            this.touchPt.x = evt.changedTouches[0].clientX
            this.touchPt.y = evt.changedTouches[0].clientY
        }
    }

    private setSnakeSpeed(key: string) {
        switch (key as NavKey) {
            case NavKey.Left:
                this.snake.setSpeed(-1, 0)
                break
            case NavKey.Up:
                this.snake.setSpeed(0, -1)
                break
            case NavKey.Right:
                this.snake.setSpeed(1, 0)
                break
            case NavKey.Down:
                this.snake.setSpeed(0, 1)
                break
        }
    }

    private keyPush(evt: KeyboardEvent) {
        this.setSnakeSpeed(evt.key)
    }

    private refresh() {
        // move snake
        switch (this.snake.move(this.obstacle)) {
            case Collision.WithObstacle:
                this.obstacle = this.board.randomObstacle()
                break

            case Collision.AutoCollision:
                this.elapsedTime = 0
                break
        }

        this.elapsedTime += this.RefreshRateMs

        // redraw
        this.board.reset()
        this.board.drawBlocks(this.snake.trail)
        this.board.drawBlock(this.obstacle)

        // update stats
        this.score.innerHTML = `Snake size : ${this.snake.size}`
        this.time.innerHTML = `Elapsed time : ${Math.round(
            this.elapsedTime / 1000,
        )}`
    }
}
