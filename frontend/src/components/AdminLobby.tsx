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
  const { players } = useGame();
  let { roomId } = useParams<{ roomId: string }>();

  const classes = useStyles();

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
          <UserList players={players} />
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
    </Paper>
  );
};

export default AdminLobby;
