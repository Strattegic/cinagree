export default interface Movie {
  id: string
  title: string
  originalTitle: string
  description: string
  imageUrl: string
}

export function fromMovieResult(movieResult: any): Movie {
  const posterPath = movieResult.poster_path.startsWith('/')
    ? movieResult.poster_path.substring(1)
    : movieResult.poster_path
  const imageUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`

  return {
    id: movieResult.id,
    title: movieResult.title,
    originalTitle: movieResult.original_title,
    description: movieResult.overview,
    imageUrl
  }
}
