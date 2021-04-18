import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { ReactNode } from "react";

interface Props {
  word: string | ReactNode;
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
<b></b>;
const CardContainer = ({ word='loppu', skip, right }: Props) => {
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
              {word==='loppu' ? <b>Sanat loppu</b> : word}
              
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item>
        {word!=='loppu'? (
          <ButtonGroup size="large" color="primary">
            <Button onClick={skip}>Skippaa</Button>
            <Button onClick={right}>Seuraava</Button>
          </ButtonGroup>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CardContainer;
