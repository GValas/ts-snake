import { api } from '../helpers/http'

interface ScoreResult {
    userId: number
    id: number
    title: string
    completed: boolean
}

export class Score {
    writeScore(score: number) {
        api<ScoreResult>('https://jsonplaceholder.typicode.com/todos/1')
            .then((res) => {
                console.log(
                    '*********',
                    { date: new Date().toISOString(), score: score },
                    res,
                )
            })
            .catch(() => {
                console.log('+++++++++')
            })
    }
}
