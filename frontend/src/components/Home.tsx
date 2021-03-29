import { Button, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3rem",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    width: "40%"
  },
}));

export const Home = () => {
  const [roomId, setRoomId] = useState("");

  const history = useHistory();

  const createRoom = () => {
    history.push(`/${uuidv4()}/admin`)
  }

  const joinRoom = () => {
    history.push(`/${roomId}/player`)
  }

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
      spacing={2}
    >
      <Typography variant="h2" component="h2" gutterBottom>
        Selitä ja arvaa
      </Typography>
      <Paper elevation={2} className={classes.paper}>
      <Grid
      container
      spacing={1}
      justify="center"
      alignItems="center"
    >
      <Grid item>
      <Typography variant="body2" gutterBottom>
        Pelaa kavereittesi kanssa alias kopitota
      </Typography>
      </Grid>
        <Grid item xs={12}>
          <TextField
            label="Huone ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            type="text"
            fullWidth
          margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={joinRoom} variant="contained" color="primary">Liity huoneeseen</Button>
          </Grid>
          <Grid item xs={6}>
          <Button onClick={createRoom} >Luo huone</Button>
          </Grid>
        
        </Grid>
      </Paper>
    </Grid>
  );
};
