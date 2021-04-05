import Player from "models/Player";

export interface SettingsI {
    time: number;
    adult: boolean;
  }

export interface Team {
    id: string;
    players: Player[];
    points: number;
    turn: Player;
}