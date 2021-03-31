import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ProvideGame } from "../hooks/useGame";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Game from "./Game";
import Lobby from "./Lobby";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:4000";

function Room() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [open, setOpen] = useState(false);
  let { roomId } = useParams<{ roomId: string }>();
  const socketRef = useRef<SocketIOClient.Socket>();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    socketRef.current?.emit("newRoomJoin", { room: roomId, name });
  };

  return (
    <ProvideGame>
      <Lobby />
      {started ? <Game /> : null}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Liity huoneeseen</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nimi"
            type="name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Liity
          </Button>
        </DialogActions>
      </Dialog>
    </ProvideGame>
  );
}

export default Room;
