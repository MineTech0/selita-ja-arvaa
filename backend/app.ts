import { PairGameRoom } from "models/PairGameRoom";
import { TeamGameRoom } from "models/TeamGameRoom";
import SocketIO from "socket.io";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;


const rooms = new Map<string, TeamGameRoom | PairGameRoom>();

//Promise function to make sure room id is unique
const makeRoom = (resolve: any) => {
  var newRoom = uuidv4();
  while (rooms.has(newRoom)) {
    newRoom = uuidv4();
  }
  rooms.set(newRoom, { roomId: newRoom, players: [], turn: {} });
  resolve(newRoom);
};

//Put the newly joined player into a room's player list
const joinRoom = (player: any, room: string) => {
  const currentRoom = rooms.get(room);
  const updatedPlayerList = currentRoom.players.concat(player);
  rooms.set(room, { ...currentRoom, players: updatedPlayerList });
};

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
  socket.on("newGame", () => {
    new Promise(makeRoom).then((room) => {
      socket.emit("newGameCreated", room);
    });
  });

  //On the client submit event (on start page) to join a room
  socket.on("joining", ({ room }) => {
    if (rooms.has(room)) {
      socket.emit("joinConfirmed",room);
    } else {
      socket.emit("errorMessage", "No room with that id found");
    }
  });

  socket.on("newRoomJoin", ({ room, name }) => {
    const currentRoom = rooms.get(room)
    if (
      room === "" ||
      name === "" ||
      !currentRoom ||
      currentRoom.players.length >= 2
    ) {
      io.to(socket.id).emit("joinError");
      console.log("joinError");
    } else {
      //Put the new player into the room
      socket.join(room);
      const id = socket.id;
      const newPlayer = {
        id,
        room,
        name,
        points: 0,
        admin: rooms.get(room).players.length === 0
      };
      joinRoom(newPlayer, room);
      const players = rooms.get(room).players;
      io.to(room).emit("newPlayers", { players });
    }
  });

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
  socket.on("disconnecting", () => {
    const currentRooms = Array.from(socket.rooms);

    if (currentRooms.length === 2){
        const room = currentRooms[1]
        const num = rooms.get(room).players.length
        if (num === 1){
            rooms.delete(room)
        }
        
        if (num === 2){
            const currentRoom = rooms.get(room)
            const players  = currentRoom.players.filter((player:any) => player.id !== socket.id)
            rooms.set(room, {...currentRoom, players})
            io.to(room).emit("newPlayers", { players });
        }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
