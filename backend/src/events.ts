import { Movie } from './repositories/movie.repository'

interface Error {
  error: string
  errorDetails?: any
}

interface Success<T> {
  data: T
}

export type Response<T> = Error | Success<T>

export interface ServerEvents {
  'movie:voted': (
      payload: {
          movie: Omit<Movie, 'id'>,
          user: string,
          vote: boolean
      },
  ) => void
  'room:userCountUpdated': (count: number) => void
}

export interface ClientEvents {
  'movie:getRandom': (
    payload: { amount: number },
    callback: (res: Response<Movie[]>) => void
  ) => void
  'movie:vote': (
        payload: {
            movie: Omit<Movie, 'id'>,
            vote: boolean
        },
  ) => void
}
