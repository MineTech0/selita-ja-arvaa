import { SettingsI, Team } from 'types';
import Player from './Player'
import Room from './Room'

export class TeamGame {
    settings: SettingsI;
    turn?: Team;
    teams: {[id: string]:Team};
    players: Player[]
    turnList = []
    constructor(players: Player[], settings: SettingsI) {
        this.settings = settings;
        this.teams = {};
        this.players = players
    }
    changePoints(targetId: string, points: number){
        this.teams[targetId].points = points
    }
    nextTurn(){
        //TODO
    }
}