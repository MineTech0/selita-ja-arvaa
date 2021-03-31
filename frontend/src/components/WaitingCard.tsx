import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

interface Props {
    text: string;
}
const useStyles = makeStyles((theme) => ({
    card: {
      width: 540,
      height: 400,
    },
    box: {
      height: "100%",
    },
  }));

function WaitingCard({text}: Props): ReactElement {
    const classes = useStyles();
    return (
        <Paper elevation={3} className={classes.card}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.box}
          >
            <Typography variant="h2" gutterBottom>
              Aloitetaan peliä
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {text}
            </Typography>
          </Box>
        </Paper>
    )
}

export default WaitingCard
