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

function sendUserCount(userCount) {
  io.in(roomId).emit('room-update', userCount)
}

io.on('connection', (socket: Socket) => {
  socket.join(roomId)
  const clients = io.sockets.adapter.rooms.get(roomId)
  sendUserCount(clients.size)
  console.log(`A user with ID '${socket.id}' connected. ${clients.size} users in the room.`)

  socket.on('movie-vote', function (data) {
    // storage.saveMovieVote(roomId, data.movie, socket.id, true)
    io.in(roomId).emit('movie-vote', {
      movie: data.movie,
      user: socket.id,
    })
  })

  socket.on('disconnecting', function () {
    const clients = io.sockets.adapter.rooms.get(roomId)
    const userCount = clients.size - 1
    sendUserCount(userCount)
    console.log(`A user with ID '${socket.id}' has disconnected. ${userCount} users in the room.`)
  })
})

console.log(`Launching WebServer @ Port 3000 - RoomId '${roomId}'`)
httpServer.listen(3000)
