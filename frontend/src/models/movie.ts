export default class Movie {
  originalTitle = ''
  description = ''
  imageUrl = ''

  constructor(readonly id: string, readonly title: string) {}

  static fromMovieResult(movieResult: any) {
    const movie = new Movie(movieResult.id, movieResult.title)
    movie.originalTitle = movieResult.original_title
    movie.description = movieResult.overview

    const posterPath = movieResult.poster_path.startsWith('/')
      ? movieResult.poster_path.substring(1)
      : movieResult.poster_path
    movie.imageUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`
    return movie
  }
}
