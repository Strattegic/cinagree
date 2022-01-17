export abstract class MovieRepository {
  abstract getRandomMovies(amount: number)
}

export interface Movie {
  id?: string
  name: string
  year: string
}
