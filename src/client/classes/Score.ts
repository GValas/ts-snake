import { api } from '../helpers/http'

interface ScoreResult {
    userId: number
    id: number
    title: string
    completed: boolean
}

export class Score {
    async writeScore(score: number) {
        try {
            const res = await api<ScoreResult>(
                'https://jsonplaceholder.typicode.com/todos/1',
            )

            console.log(
                '*********',
                { date: new Date().toISOString(), score: score },
                res,
            )
        } catch {
            console.log('+++++++++')
        } 
    }
}
