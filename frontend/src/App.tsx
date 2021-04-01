import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Box, Container, makeStyles } from "@material-ui/core";

import { ProvideGame } from "./hooks/useGame";
import Room from "./components/Room";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3rem",
    flexGrow: 1,
    height: '100%'
  },
}));

function App() {
  const classes = useStyles();

  const RoomProvider = () => (
    <ProvideGame>
      <Room/>
    </ProvideGame>
  )
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
              <Route exact path="/:roomId" component={RoomProvider} />
            </Box>
          </Container>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
