import { SettingsI } from 'types';
import Player from './Player'
import Room from './Room'

export class PairGameRoom extends Room {
    players: Player[];
    settings: SettingsI;
    turn: Player;
    constructor(players: Player[], settings: SettingsI, roomId: string) {
        super(roomId);
        this.players = players;
        this.settings = settings;
        this.turn = players[0];
    }
}