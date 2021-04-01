import { Button, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:4000";

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
  const socketRef = useRef<SocketIOClient.Socket>();
  const history = useHistory();
  
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    console.log(socketRef.current);
    socketRef.current.on('newGameCreated', (room: string) =>{
      joinRoom(room)
  })
    socketRef.current.on('joinConfirmed', (room: string)=>{
      console.log('joinCorfimed')
      joinRoom(room)
  })
    socketRef.current.on('errorMessage', (message: string)=>{
      console.log(message);
  })
    return () => {
      console.log('dissconnected');
    };
  }, [])

  const joinRoom = (room: string) => {
    history.push(`/${room}`)
  }

  const joinButton = () => {
    socketRef.current?.emit('joining', {room:roomId})
  }
  const createButton = () => {
    console.log('create');
    socketRef.current?.emit('newGame')
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
          <Button onClick={joinButton} variant="contained" color="primary">Liity huoneeseen</Button>
          </Grid>
          <Grid item xs={6}>
          <Button onClick={createButton} >Luo huone</Button>
          </Grid>
        
        </Grid>
      </Paper>
    </Grid>
  );
};
