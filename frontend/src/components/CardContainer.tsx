import { Box, Button, ButtonGroup, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

interface Props {
  word: string;
  skip: () => void;
  right: () => void;
}
const useStyles = makeStyles((theme) => ({
  card: {
    width: 240,
    height: 400,
  },
  box: {
    height: "100%",
  },
}));

const CardContainer = ({ word = "muuklainen", skip, right }: Props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Paper elevation={3} className={classes.card}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.box}
          >
            <Typography variant="subtitle1" gutterBottom>
              {word}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item>
        <ButtonGroup
          size="large"
          color="primary"
        >
          <Button onClick={skip}>Skippaa</Button>
          <Button onClick={right}>Seuraava</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default CardContainer;
