import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

io.on("connection", (socket: Socket) => {
    console.log("A user with ID: " + socket.id + " connected");

    socket.on('movie-matching', function (data) {
        console.log(data)
    })

    socket.on("disconnect", function () {
        console.log("A user with ID: " + socket.id + " disconnected");
    });
});

console.log('Launching WebServer @ Port 3000')
httpServer.listen(3000);