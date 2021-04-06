import { v4 as uuidv4 } from "uuid";
import Player from "./Player";

export default class Room {
    roomId: string;
    players: Player[];
    constructor() {
        this.roomId = uuidv4()
        this.players = []
    }
    joinRoom(player: Player) {
        return this.players.concat(player)
    }
    leaverRoom(playerId: string) {
        this.players = this.players.filter((player:any) => player.id !== playerId)
    }
}