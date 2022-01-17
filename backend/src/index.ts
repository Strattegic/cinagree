import 'dotenv/config'
import { createServer } from 'http'
import { Socket } from 'socket.io'
import { v4 as uuid } from 'uuid'
import { createApplication } from './app'
import MatchingStorage from './database/matchingStorage'
import { InMemoryMovieRepository } from './repositories/inMemoryMovie.repository'
import {MovieDb} from "moviedb-promise/dist"
import Movie from "./models/movie"

const httpServer = createServer()
const movieDb = new MovieDb(process.env.TMDB_API_KEY!)

const io = createApplication(
  httpServer,
  {
    movieRepository: new InMemoryMovieRepository(),
  },
  {
    cors: {
      origin: ['http://localhost:8080'],
    },
  }
)

httpServer.listen(3000)

const roomId = createRoom()

const storage = new MatchingStorage()

const onConnection = (socket: Socket) => {
  console.log(`A user with ID '${socket.id}' connected.`)
  socket.join(roomId)
  sendUserCount()

  // TODO: move to room initialization
  loadMovies().then(movies => {
    socket.emit('movies:loaded', movies)
  })

  socket.on('movie:vote', function (data) {
    // storage.saveMovieVote(roomId, data.movie, socket.id, true)

    if (data.vote) {
      console.debug(`Got a vote for ${data.movie.title} from user '${socket.id}'`)
      socket.to(roomId).emit('movie:voted', {
        movie: data.movie,
        user: socket.id,
        vote: true
      })
    }
  })

  socket.on('disconnect', () => {
    sendUserCount()
    console.log(`A user with ID '${socket.id}' has disconnected.`)
  })
}

io.on('connection', onConnection)

async function loadMovies(): Promise<Movie[]> {
  const response = await movieDb.moviePopular()

  return response.results.map((result: any) => {
    return Movie.fromMovieResult(result)
  })
}

function createRoom(): string {
  return uuid()
}

function sendUserCount() {
  const clients = io.sockets.adapter.rooms.get(roomId)
  if (clients) {
    io.in(roomId).emit('room:userCountUpdated', clients.size)
  }
}

console.log(`Launching WebServer @ Port 3000 - RoomId '${roomId}'`)
