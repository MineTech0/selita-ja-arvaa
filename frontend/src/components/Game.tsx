import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useGame from "../hooks/useGame";
import CardContainer from "./CardContainer";
import EndRound from "./EndRound";
import LeaderBoard from "./LeaderBoard";
import WaitingCard from "./WaitingCard";

const Game = () => {
  const { right, skip, word, points, gameState, myTurn } = useGame();

    const Render = () => {
        switch (gameState) {
            case 'myTurn':
                return <CardContainer right={right} skip={skip} word={word} />
        
            case 'othersTurn':
                return <Typography variant="subtitle1">Arvaa kun kaverisi selittää</Typography>
        
            case 'starting':
                return  <WaitingCard text={myTurn ? "Sinä aloitat" : "Toinen pelaaja aloittaa"}/>

            case 'endRound':
                return <EndRound/>
        }
    };
  return (
    <Grid
    container
    direction="row"
    spacing={2}
  >
      <Grid item>
        <LeaderBoard/>
      </Grid>
      <Grid item>
      {Render()}
      </Grid>
    </Grid>
  );
};

export default Game;
