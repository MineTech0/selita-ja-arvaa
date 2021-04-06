import { SettingsI } from 'types';
import Player from './Player'
import Room from './Room'

export class PairGameRoom extends Room {
    settings: SettingsI;
    turn: Player;
    constructor( settings: SettingsI) {
        super();
        this.settings = settings;
        this.turn = this.players[0];
    }
}