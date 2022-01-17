import { Server as HttpServer } from 'http'
import { Server, ServerOptions } from 'socket.io'
import { ClientEvents, ServerEvents } from './events'
import { MovieRepository } from './repositories/movie.repository'

export interface Components {
  movieRepository: MovieRepository
}

export function createApplication(
  httpServer: HttpServer,
  components: Components,
  serverOptions: Partial<ServerOptions> = {}
): Server<ClientEvents, ServerEvents> {
  const io = new Server<ClientEvents, ServerEvents>(httpServer, serverOptions)

  io.on('connection', (_) => {
    // TODO: setup server
  })

  return io
}
