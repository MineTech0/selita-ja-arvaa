export interface SettingsI {
    time: number;
    adult: boolean;
  }
  export type GameState =  "myTurn" | "starting" |  "othersTurn" | "lobby" | "endRound";
  
  export interface StateI {
    players: Player[];
    turn: Player;
    words: string[];
    word: string;
    gameState: GameState;
  }

  export interface Player {
    id: string
    name: string;
    points: number;
    admin: boolean;
  }

  export interface Team {
    id: string;
    players: Player[];
    points: number;
    turn: Player;
}
export type GameType = 'Pair' | 'Team'