import { GameType, SettingsI } from 'types'
import { v4 as uuidv4 } from 'uuid'
import { PairGame } from './PairGame'
import Player from './Player'
import { TeamGame } from './TeamGame'

export default class Room {
  roomId: string
  clients: Player[]
  game: TeamGame | PairGame
  constructor() {
    this.roomId = uuidv4()
    this.clients = []
    this.game = {} as PairGame
  }
  joinRoom(player: Player) {
    if(this.clients.length === 0) {
      player.admin = true
    }
    this.clients = this.clients.concat(player)
  }
  leaveRoom(playerId: string) {
    this.clients = this.clients.filter((player: any) => player.id !== playerId)
  }
  createGame(type: GameType, settings: SettingsI) {
    switch (type) {
      case 'Pair':
        this.game = new PairGame(this.clients, settings)
        break
      case 'Team':
        // this.game = new TeamGame(settings)
        break
    }
  }
}
