import SocketIO from "socket.io";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import Player from "./Player";

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;

io.use((socket: any, next: any) => {
  const name = socket.handshake.auth.name;
  if (!name) {
    return next(new Error("invalid name"));
  }
  socket.name = name;
  next();
});

//Store the room ids mapping to the room property object
//The room property object looks like this {roomid:str, players:Array(2)}
const rooms = new Map();

//Promise function to make sure room id is unique
const makeRoom = (resolve: any) => {
  var newRoom = uuidv4();
  while (rooms.has(newRoom)) {
    newRoom = uuidv4();
  }
  rooms.set(newRoom, { roomId: newRoom, players: [] });
  resolve(newRoom);
};

//Put the newly joined player into a room's player list
const joinRoom = (player: Player, room: string) => {
  const currentRoom = rooms.get(room);
  const updatedPlayerList = currentRoom.players.push(player);
  rooms.set(room, { ...currentRoom, players: updatedPlayerList });
};

//Check how many player is currently in the room
function getRoomPlayersNum(room: string) {
  return rooms.get(room).players.length;
}

io.on("connection", (socket: SocketIO.Socket) => {
  console.log("connection");
  socket.on("*", function (event, data) {
    console.log(event);
    console.log(data);
  });
  //On the client submit event (on start page) to create a new room
  socket.on("newGame", () => {
    new Promise(makeRoom).then((room) => {
      socket.emit("newGameCreated", room);
    });
  });

  //On the client submit event (on start page) to join a room
  socket.on("joining", ({ room }) => {
    if (rooms.has(room)) {
      socket.emit("joinConfirmed");
    } else {
      socket.emit("errorMessage", "No room with that id found");
    }
  });

  socket.on("newRoomJoin", ({ room, name }) => {
    //If someone tries to go to the game page without a room or name then
    //redirect them back to the start page
    if (room === "" || name === "") {
      io.to(socket.id).emit("joinError");
    }

    //Put the new player into the room
    socket.join(room);
    const id = socket.id;
    const newPlayer = new Player(name, room, id);
    joinRoom(newPlayer, room);

    socket.emit("newPlayer", { players: rooms.get(room).players });
  });

  //On disconnect event
  socket.on("disconnecting", () => {
    //Get all the rooms that the socket is currently subscribed to
    const currentRooms = Object.keys(socket.rooms);
    //In this game an object can only have 2 rooms max so we check for that
    // if (currentRooms.length === 2){
    //     //The game room is always the second element of the list
    //     const room = currentRooms[1]
    //     const num = getRoomPlayersNum(room)
    //     //If one then no one is left so we remove the room from the mapping
    //     if (num === 1){
    //         rooms.delete(room)
    //     }
    //     //If 2 then there is one person left so we remove the socket leaving from the player list and
    //     //emit a waiting event to the other person
    //     if (num === 2){
    //         currentRoom = rooms.get(room)
    //         currentRoom.players = currentRoom.players.filter((player) => player.id !== socket.id)
    //         io.to(room).emit('waiting')
    //     }
    // }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
