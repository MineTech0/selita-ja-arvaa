import { Socket } from "socket.io";
import { addUser, removeUser, getUsersInRoom } from './users';

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;

io.on("connection", (socket: Socket) => {
  
  socket.on('join', ({ name, room }) => {
    const { error, user } = addUser({ id: socket.id, name, room }); // add user with socket id and room info

    if (error || !user) {
        console.log(error);
        return ;
    };

    socket.join(user.room);

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room) // get user data based on user's room
    });
  });

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
  
    if (user) {
      io.to(user.room).emit('message', {
        user: 'adminX',
        text: `${user.name.toUpperCase()} has left.`
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});