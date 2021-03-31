import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

export interface Player {
  id: string;
  name: string;
  room: string;
}
export interface GameContextI {
  players: Player[];
}
interface CustomSocket extends SocketIOClient.Socket {
  auth: {
    name: string;
  }
}

const useProvideGame = (): GameContextI => {
  const [players, setPlayers] = useState<Player[]>([]);
  const socketRef = useRef<CustomSocket>();
  
  
  useEffect(() => {
    console.log('registered');
    socketRef.current = socketIOClient(SOCKET_SERVER_URL) as CustomSocket;

    socketRef.current.on('newPlayer', ({players}: {players: Player[]})=>{
      setPlayers(players);
  })

    return () => {
      console.log('unregistered');
      socketRef.current?.disconnect();
    };

  }, []);


  return {  players  };
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
