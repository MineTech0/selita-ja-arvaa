import { SettingsI } from 'types';
import Player from './Player';
import Room from './Room'

export class PairGame {
    settings: SettingsI;
    turn: Player;
    players: Player[]
    turnIndex = 0
    constructor(players: Player[], settings: SettingsI) {
        this.settings = settings;
        this.players = players;
        this.turn = players[0];
    }
    changePoints(targetId: string, pointModifier: 1 |-1){
        const player = this.players.find(p => p.id === targetId) as Player
        player.points += pointModifier
        this.players = this.players.map(p => p.id === targetId ? player : p)
    }
    nextTurn(){
        this.turn = this.players[this.turnIndex === 0 ? 1: 0]
    }
}