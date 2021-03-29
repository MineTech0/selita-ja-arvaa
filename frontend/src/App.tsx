import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import AdminLobby from "./components/AdminLobby";
import { Container, Grid, makeStyles } from "@material-ui/core";
import PlayerLobby from "./components/PlayerLobby";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3rem",
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Container>
          <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
      className={classes.root}
    >
            <Route exact path="/" component={Home} />
            <Route exact path="/:roomId/admin" component={AdminLobby} />
            <Route exact path="/:roomId/player" component={PlayerLobby} />
            </Grid>
          </Container>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
