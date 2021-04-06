import { SettingsI, Team } from 'types';
import Player from './Player'
import Room from './Room'

export class TeamGameRoom extends Room {
    settings: SettingsI;
    turn?: Team;
    teams: {[id: string]:Team}
    constructor( settings: SettingsI) {
        super();
        this.settings = settings;
        this.teams = {};
    }
}