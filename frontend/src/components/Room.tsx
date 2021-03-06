import { useState } from "react";
import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Game from "./pages/Game";
import Lobby from "./pages/Lobby";

function Room() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(true);
  let { roomId } = useParams<{ roomId: string }>();
  const {joinRoom, state} = useGame();

  const handleClose = () => {
    setOpen(false);
    joinRoom(roomId, name)
  };

  return (
      <>
      {state.gameState !=='lobby' ? <Game /> : <Lobby />}

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
      </>
  );
}

export default Room;
