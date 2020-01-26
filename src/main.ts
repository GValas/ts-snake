import { Board } from './Board'
import { Game } from './Game'
import { Snake } from './Snake'

window.addEventListener('load', () => {
    const board = new Board()
    const snake = new Snake(board.BoardSize)
    const game = new Game(board, snake)
    game.start()
})
