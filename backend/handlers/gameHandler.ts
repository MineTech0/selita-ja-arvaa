import { GetRandomWords } from './../utils/wordUtils'
import { GameType, SettingsI } from './../types'
import Room from 'models/Room'

module.exports = (io: any, rooms: Map<string, Room>) => {
  const startGame = function (
    this: any,
    {
      settings,
      room,
      type,
    }: { settings: SettingsI; room: string; type: GameType }
  ) {
    let currentRoom = rooms.get(room)
    if (!currentRoom || currentRoom.clients.length < 2) {
      io.to(room).emit('startError')
    } else {
      currentRoom.createGame(type, settings)
      console.log(currentRoom.game)
      io.to(room).emit('newGameState', { state: currentRoom.game })
      rooms.set(room, currentRoom)
      startRound(room)
    }
  }

  const startRound = function (room: string) {
    const currentRoom = rooms.get(room)

    if (!currentRoom || currentRoom.game.players.length < 2) {
      io.to(room).emit('startError')
    } else {
      io.to(room).emit('startingGame', {
        turn: currentRoom.game.turn,
        settings: currentRoom.game.settings
      })

      const words = GetRandomWords(50)

      setTimeout(() => {
        if(gameExists(currentRoom)){
          io.to(room).emit('startRound', { words, turn: currentRoom.game.turn })
        }
        setTimeout(() => {
          if(gameExists(currentRoom)){
            io.to(room).emit('endRound')
          }
        }, 1000 * currentRoom.game?.settings?.time || 0)
      }, 6000)
    }
  }
  const updatePoints = function (
    this: any,
    {
      targetId,
      pointModifier,
      room,
    }: { targetId: string; pointModifier: 1 | -1; room: string }
  ) {
    const socket = this
    const currentRoom = rooms.get(room)

    if (!currentRoom) {
      throw new Error('updateError')
    }

    currentRoom.game.changePoints(targetId, pointModifier)
    rooms.set(room, currentRoom)
    io.to(room).emit('newGameState', { state: currentRoom.game })
  }
  const nextRound = ({ room }: { room: string }) => {
    const currentRoom = rooms.get(room)
    if (!currentRoom) {
      throw new Error('updateError')
    }
    currentRoom.game.nextTurn()
    rooms.set(room, currentRoom)
    startRound(room)
  }
  const gameExists = (room: Room): boolean => {
    return Object.keys(room.game).length !== 0
  }

  return {
    startGame,
    startRound,
    updatePoints,
    nextRound
  }
}
