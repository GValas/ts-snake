import { Board } from './Board'
import { Snake } from './Snake'
import { Game } from './Game'

window.addEventListener('load', () => {
    const board = new Board()
    const snake = new Snake()
    const game = new Game(board, snake)
    game.start()
})
