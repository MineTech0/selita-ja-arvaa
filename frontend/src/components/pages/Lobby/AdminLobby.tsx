import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router";
import useGame from "../../../hooks/useGame";
import Settings from "./Settings";
import UserList from "./UserList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 500,
    textAlign: 'center',
    
  },
  button: {
    marginTop: 60
  }
}));

const AdminLobby = () => {
  const { state, startGame, clients } = useGame();
  let { roomId } = useParams<{ roomId: string }>();
  const [settings, setSettings] = useState({
    time: 60,
    adult:false
  })

  const classes = useStyles();

  const startButton = () => {
    startGame(settings)
  }

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
          <Typography variant="caption" display="block" gutterBottom>
            {roomId}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <UserList players={clients} />
        </Grid>
        <Grid item xs={6}>
          <Settings setSettings={setSettings} />
        </Grid>
        <Grid item xs={12} className={classes.button}>
          <Button variant="contained" color="primary" onClick={startButton} disabled={clients.length < 2}>
            Aloita peli
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdminLobby;
