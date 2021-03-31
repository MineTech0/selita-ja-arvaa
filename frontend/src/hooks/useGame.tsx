import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory, useParams } from "react-router";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

export interface Player {
  id: string;
  name: string;
  room: string;
  points: number;
}
export interface GameContextI {
  state: StateI;
  joinRoom: (room: string, name: string) => void;
  startGame: (settings: SettingsI) => void;
  right: () => void;
  skip: () => void;
  myTurn: boolean;

}
export interface SettingsI {
  time: number;
  adult: boolean;
}
export interface StateI {
    players: Player[];
    turn: Player;
    words: string[];
    word: string;
    currentWord: string;
    gameState: GameState;
}
export type GameState = "starting" | "myTurn" | "othersTurn" | "lobby" | 'endRound';

const useProvideGame = (): GameContextI => {
  const [state, setState] = useState<StateI>({} as StateI)
  const [myTurn, setMyTurn] = useState(false)
  const socketRef = useRef<SocketIOClient.Socket>();
  const history = useHistory();
  let { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    console.log("registered");
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    socketRef.current.on("newPlayer", ({ players }: { players: Player[] }) => {
      setState({...state, players})
    });
    socketRef.current.on("newState", ({ state }: { state: StateI }) => {
      setState(state)
    });
    socketRef.current.on("endRound", () => {
      setState({...state, gameState: 'endRound'})
    });
    socketRef.current.on("joinError", () => {
      history.push("/");
    });
    socketRef.current.on(
      "startingGame",
      ({
        settings,
        startPlayer,
      }: {
        settings: SettingsI;
        startPlayer: Player;
      }) => {
        if (startPlayer.id === socketRef.current?.id) {
          setMyTurn(true);
        }
        setState({...state, gameState:'starting'});
      }
    );
    socketRef.current.on("startRound", ({ turn }: { turn: Player }) => {
      
      if(turn.id === socketRef.current?.id){
        setState({...state, turn, gameState:'myTurn'})
      }
      else {
        setState({...state, turn, gameState:'othersTurn'})
      }
    });

    return () => {
      console.log("unregistered");
      socketRef.current?.disconnect();
    };
  }, []);

  const joinRoom = (room: string, name: string) => {
    socketRef.current?.emit("newRoomJoin", { room, name });
  };
  const startGame = (settings: SettingsI) => {
    socketRef.current?.emit("startGame", { settings, room: roomId });
  };

  const right = () => {
    const newState = {...state, players: editPoints(1)}
    setState(newState)
    socketRef.current?.emit("updateState", { state: newState, room: roomId });
    nextWord();
  };
  const skip = () => {
    const newState = {...state, players: editPoints(-1)}
    setState(newState)
    socketRef.current?.emit("updateState", { state: newState, room: roomId });
    nextWord();
  };
  const nextWord = () => {
    setState({...state, word: state.words[state.words.indexOf(state.word as never) + 1 ]})
  };

  const editPoints = (modifier: -1| 1) => {
    let players = state.players
    let meIndex = players.findIndex((p)=> p.id === socketRef.current?.id)
    players[meIndex] = {...players[meIndex], points: players[meIndex].points + modifier }
    return players

  }

  return {
    state,
    joinRoom,
    startGame,
    right,
    skip,
    myTurn

  };
};
const GameContext = createContext<GameContextI | undefined>(undefined);

export function ProvideGame({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const game = useProvideGame();
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

const useGame = (): GameContextI => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export default useGame;
