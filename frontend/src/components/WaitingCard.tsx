import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { ReactElement, ReactNode } from 'react'

interface Props {
    text: ReactNode;
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
            {text}
          </Box>
          
        </Paper>
    )
}

export default WaitingCard
