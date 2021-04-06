import Player from 'models/Player'
import Room from 'models/Room'

module.exports = (io: any, rooms: Map<string, Room>) => {
  const createRoom = function (this: any) {
    const socket = this

    const newRoom = new Room()
    rooms.set(newRoom.roomId, newRoom)
    socket.emit('newGameCreated', newRoom)
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
      !currentRoom ||
      currentRoom.players.length >= 2
    ) {
      io.to(socket.id).emit('joinError')
      console.log('joinError')
    } else {
      socket.join(room)
      const newPlayer = new Player(name, socket.id)
      currentRoom.joinRoom(newPlayer)

      io.to(room).emit('newPlayers', { players: currentRoom.players })
    }
    rooms.set(room, currentRoom as Room)
  }
  const leaveRoom = function (this: any) {
    const socket = this
    const currentRooms: string[] = Array.from(socket.rooms);

    if (currentRooms.length === 2){
        const room = currentRooms[1]
        const num = rooms.get(room)?.players.length
        if (num === 1){
            rooms.delete(room)
        }
        
        if (num === 2){
            const currentRoom = rooms.get(room)
            currentRoom?.leaverRoom(socket.id)
            rooms.set(room, currentRoom as Room)
            io.to(room).emit("newPlayers", { players: currentRoom?.players });
        }
    }
  }

  return {
    createRoom,
    joinRoom,
    leaveRoom,
  }
}
