import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

export interface User {
    id: string;
    name: string;
    room: string;
}

const useGame = () => {
    const [clients, setClients] = useState<User[]>([])
    const [connected, setConnected] = useState(false)
    const socketRef = useRef<SocketIOClient.Socket>();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);


    socketRef.current.on('roomData', (data: any) => {
        setClients(data.users)
        console.log(data);
      });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Sends a message to the server that
  // forwards it to all users in the same room
//   const sendMessage = (messageBody) => {
//     socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
//       body: messageBody,
//       senderId: socketRef.current.id,
//     });
//   };

const connect = (name: string, roomId: string) => {
  socketRef.current?.emit('join', { name, room: roomId });
  setConnected(true);
}

  return { clients, connect, connected};
}

export default useGame
