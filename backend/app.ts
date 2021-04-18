import Room from "models/Room";
import SocketIO from "socket.io";

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;

const rooms = new Map<string, Room>();

const { joinRoom, createRoom, leaveRoom } = require("./handlers/roomHandler")(io, rooms);
const { startGame, updatePoints ,nextRound } = require("./handlers/gameHandler")(io, rooms);

io.on("connection", (socket: SocketIO.Socket) => {
  console.log("connection");
  //On the client submit event (on start page) to create a new room
  socket.on("newGame", createRoom);

  //On the client submit event (on start page) to join a room
  socket.on("joining", ({ room }) => {
    if (rooms.has(room)) {
      socket.emit("joinConfirmed",room);
    } else {
      socket.emit("errorMessage", "No room with that id found");
    }
  });

  socket.on("newRoomJoin", joinRoom);

  socket.on("startGame", startGame);

  socket.on("pointChange", updatePoints);

  socket.on("nextRound", nextRound);

  //On disconnect event
  socket.on("disconnecting", leaveRoom);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
