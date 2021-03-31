import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import AdminLobby from "./components/AdminLobby";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import PlayerLobby from "./components/PlayerLobby";
import CardContainer from "./components/CardContainer";
import Lobby from "./components/Lobby";
import { ProvideGame } from "./hooks/useGame";
import Room from "./components/Room";

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
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className={classes.root}
            >
              <Route exact path="/" component={Home} />
              <Route exact path="/card" component={CardContainer} />
              <Route exact path="/:roomId" component={Room} />
            </Box>
          </Container>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
