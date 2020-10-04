import { Board } from './classes/Board'
import { Game } from './classes/Game'
import { Snake } from './classes/Snake'

window.addEventListener('load', () => {
    const board = new Board()
    const snake = new Snake(board.BoardSize)
    const game = new Game(board, snake)
    game.start() 
})
