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

const { joinRoom, createRoom, leaveRoom } = require("./roomHandler")(io, rooms);

const startRound = (room: string) => {
  const currentRoom = rooms.get(room);
  io.to(room).emit("startingGame", { startPlayer: currentRoom.turn, settings: currentRoom.settings });

  const words = GetRandomWords(50);

  setTimeout(() => {
    io.to(room).emit("startRound", { words, turn: currentRoom.turn });
    setTimeout(() => {
      io.to(room).emit("endRound");
    }, 1000* currentRoom.settings.time);
  }, 6000);
};

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

  socket.on("startGame", ({ settings, room }) => {
    const currentRoom = rooms.get(room);
    if (currentRoom.players.lenght < 2) {
      io.to(room).emit("startError");
    } else {
      const turn = currentRoom.players[0];
    rooms.set(room, { ...currentRoom, turn, settings });
      startRound(room);
    }
  });

  socket.on("changePoints", ({ newPlayers, room }) => {
    const currentRoom = rooms.get(room);
    rooms.set(room, { ...currentRoom, players: newPlayers });
    socket.to(room).emit("newPlayers", { players: newPlayers });
  });

  socket.on("nextRound", ({ room }) => {
    const currentRoom = rooms.get(room);
    const index = currentRoom.players.findIndex((p:any) => p.id === currentRoom.turn.id)
    const turn =
      currentRoom.players[ index === 0 ? 1:0];
    rooms.set(room, { ...currentRoom, turn });
    startRound(room);
  });

  //On disconnect event
  socket.on("disconnecting", leaveRoom);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
