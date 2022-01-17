import { Movie, MovieRepository } from './movie.repository'

export class InMemoryMovieRepository extends MovieRepository {
  getRandomMovies(amount: number): Promise<Movie[]> {
    return Promise.resolve([
      {
        name: 'Stargate',
        year: '1999',
      },
    ])
  }
}
