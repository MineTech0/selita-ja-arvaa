import { Button, Grid, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import useGame from "../hooks/useGame";

function EndRound(): ReactElement {
  const { nextRound, admin } = useGame();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h3">Kierros päättyi</Typography>
      </Grid>
      {admin() ? (
        <Grid item>
          <Button onClick={nextRound} variant="contained" color="primary">
            Seuraava kierros
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default EndRound;
