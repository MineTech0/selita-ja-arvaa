import Player from '../models/Player'
import Room from '../models/Room'

module.exports = (io: any, rooms: Map<string, Room>) => {
  const createRoom = function (this: any) {
    const socket = this

    const newRoom = new Room()
    rooms.set(newRoom.roomId, newRoom)
    socket.emit('newGameCreated', newRoom.roomId)
  }

  const joinRoom = function (
    this: any,
    { room, name }: { room: string; name: string }
  ) {
    const socket = this
    const currentRoom = rooms.get(room)
    if (
      room === '' ||
      name === '' ||
      !currentRoom 
    ) {
      io.to(socket.id).emit('joinError')
      console.log('joinError')
    } else {
      socket.join(room)
      const newPlayer = new Player(name, socket.id)
      currentRoom.joinRoom(newPlayer)
      console.log(currentRoom.clients)
      io.to(room).emit('newClient', { clients: currentRoom.clients })
    }
    rooms.set(room, currentRoom as Room)
  }
  const leaveRoom = function (this: any) {
    const socket = this
    const currentRooms: string[] = Array.from(socket.rooms);

    if (currentRooms.length === 2){
        const room = currentRooms[1]
        const num = rooms.get(room)?.clients.length
        if (num === 1){
            rooms.delete(room)
        }
        
        if (num === 2){
            const currentRoom = rooms.get(room)
            currentRoom?.leaveRoom(socket.id)
            rooms.set(room, currentRoom as Room)
            io.to(room).emit("newClient", { clients: currentRoom?.clients });
        }
    }
  }

  return {
    createRoom,
    joinRoom,
    leaveRoom,
  }
}
