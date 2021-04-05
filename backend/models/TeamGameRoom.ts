import { SettingsI, Team } from 'types';
import Player from './Player'
import Room from './Room'

export class TeamGameRoom extends Room {
    players: Player[];
    settings: SettingsI;
    turn?: Team;
    teams: Team[]
    constructor(players: Player[], settings: SettingsI, roomId: string) {
        super(roomId);
        this.players = players;
        this.settings = settings;
        this.teams = [];
    }
}