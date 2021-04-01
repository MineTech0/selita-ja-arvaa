import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { ReactElement, ReactNode } from 'react'

interface Props {
    text: ReactNode;
}
const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 500,
      width: 'auto',
      height: 400,
      paddingLeft: '2rem',
      paddingRight: '2rem',
      textAlign: 'center'
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
