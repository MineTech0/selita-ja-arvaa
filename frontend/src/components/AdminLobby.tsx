import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import Settings from "./Settings";
import UserList from "./UserList";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3rem",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    width: "40%",
    textAlign: 'center',
    
  },
  button: {
    marginTop: 60
  }
}));

const AdminLobby = () => {
  let { roomId } = useParams<{ roomId: string }>();
  const { connect, clients, connected } = useGame();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleClose = () => {
    connect(name, roomId);
    setOpen(false);
  };

  useEffect(() => {
    if (!connected) {
      setOpen(true);
    }
  }, [roomId]);

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="row"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography variant="h4" component="h4" gutterBottom>
            Pelihuone
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {roomId}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <UserList clients={clients} />
        </Grid>
        <Grid item xs={6}>
          <Settings />
        </Grid>
        <Grid item xs={12} className={classes.button}>
          <Button variant="contained" color="primary">
            Aloita peli
          </Button>
        </Grid>
      </Grid>

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
    </Paper>
  );
};

export default AdminLobby;
