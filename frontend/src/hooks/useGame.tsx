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
import { Player, SettingsI, StateI } from "./gameTypes";

const SOCKET_SERVER_URL = "http://localhost:4000";

export interface GameContextI {
  state: StateI;
  joinRoom: (room: string, name: string) => void;
  startGame: (settings: SettingsI) => void;
  right: () => void;
  skip: () => void;
  myTurn: boolean;
  admin: () => boolean;
  nextRound: () => void;
  time: number;
  settings: SettingsI;
  clients: Player[];
  wordIndex: number;
}

  
const defaultState: StateI = {
  players: [],
  turn: {} as Player,
  words: [],
  word: "",
  gameState: "lobby",
};
const useProvideGame = (): GameContextI => {
  const [state, setState] = useState<StateI>(defaultState);
  const [clients, setClients] = useState<Player[]>([] as Player[]);
  const [myTurn, setMyTurn] = useState(false);
  const [time, setTime] = useState(60)
  const [settings, setSettings] = useState<SettingsI>({} as SettingsI)
  const [wordIndex, setWordIndex] = useState(0)
  const socketRef = useRef<SocketIOClient.Socket>();
  const history = useHistory();
  let { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    console.log("registered");
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    socketRef.current.on("newClient", ({ clients }: { clients: Player[] }) => {
      console.log(clients)
      setClients(clients);
    });
    socketRef.current.on("newGameState", ({ state }: { state:any }) => {
      setState(s => ({ ...s, players:state.players }));
    });
    // socketRef.current.on("newState", ({ newPlayers}: { newPlayers: Player[] }) => {
    //   console.log(state);
    //   setState(state);
    // });
    socketRef.current.on("endRound", () => {
      Timer('stop');
      setTime(0)
      setState(s => ({ ...s, gameState: "endRound" }));
    });
    socketRef.current.on("joinError", () => {
      history.push("/");
    });
    socketRef.current.on("endGame", () => {
      Timer('stop');
      setTime(0)
      setState(s => ({ ...s, gameState: "lobby" }));
    });
    socketRef.current.on(
      "startingGame",
      ({
        settings,
        turn,
      }: {
        settings: SettingsI;
        turn: Player;
      }) => {
        setTime(settings.time)
        setSettings(settings);
        if (turn.id === socketRef.current?.id) {
          setMyTurn(true);
        }
        else {
          setMyTurn(false);
        }
        setState(s => ({ ...s, gameState: "starting" }));
      }
    );
    socketRef.current.on("startRound", ({ turn, words  }: { turn: Player, words: string[] }) => {
      if (turn.id === socketRef.current?.id) {
        setState(s => ({ ...s, turn, words, word: words[0], gameState: "myTurn" }));
      } else {
        setState(s => ({ ...s, turn, words, gameState: "othersTurn" }));
      }
      Timer('start');
      setWordIndex(1)
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
    setSettings(settings)
    socketRef.current?.emit("startGame", { settings, room: roomId, type: 'Pair' });
  };

  const right = () => {
    nextWord();
    socketRef.current?.emit("pointChange", { targetId: socketRef.current?.id ,pointModifier: +1,  room: roomId });
  };
  const skip = () => {
    nextWord();
    socketRef.current?.emit("pointChange", { targetId: socketRef.current?.id ,pointModifier: -1,  room: roomId });
  };
  const nextWord = () => {
    console.log(wordIndex)
    setWordIndex(wordIndex + 1)
    setState(s => ({
      ...s,
      word: s.words[wordIndex],
    }));
    console.log(wordIndex)
  };

  const admin = () => {
    return clients.find((p) => p.id === socketRef.current?.id)?.admin as boolean

  }
  const nextRound = () => {
    socketRef.current?.emit("nextRound",{room: roomId});
  }
  let timer: NodeJS.Timeout;
  const Timer = (action: "start" | "stop") => {
    switch (action) {
      case "start":
        timer = setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000);
        break;

      default:
        clearInterval(timer);
        break;
    }
  };

  return {
    state,
    joinRoom,
    startGame,
    right,
    skip,
    myTurn,
    admin,
    nextRound,
    time,
    settings,
    clients,
    wordIndex
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
