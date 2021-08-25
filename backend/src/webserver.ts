import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { v4 as uuid } from 'uuid'
import MatchingStorage from './database/matchingStorage'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

const storage = new MatchingStorage()
const roomId = uuid()

io.on('connection', (socket: Socket) => {
  console.log(`A user with ID '${socket.id}' connected`)

  socket.on('movie-matching', function (data) {
    storage.saveMovieVote(roomId, data.movie, socket.id, data.isMatch)
  })

  socket.on('disconnect', function () {
    console.log(`A user with ID '${socket.id}' disconnected`)
  })
})

console.log(`Launching WebServer @ Port 3000 - RoomId '${roomId}'`)
httpServer.listen(3000)
