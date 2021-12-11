import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useGame from '../../../hooks/useGame'
import CardContainer from '../../templates/CardContainer'
import EndRound from './EndRound'
import LeaderBoard from './LeaderBoard'
import TimerProgress from './TimerProgress'
import WaitingCard from '../../templates/WaitingCard'
import { BrowserView, MobileView } from 'react-device-detect'
import MobileLeaderBoard from './MobileLeaderBoard'

const Game = () => {
  const { right, skip, myTurn, state, time } = useGame()
  const Render = () => {
    switch (state.gameState) {
      case 'myTurn':
        return <CardContainer right={right} skip={skip} word={state.word} />

      case 'othersTurn':
        let answerText = (
          <Typography variant="subtitle1">
            Arvaa kun kaverisi selittää
          </Typography>
        )
        return <WaitingCard text={answerText} />

      case 'starting':
        let startText = (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h2" gutterBottom>
                Aloitetaan peliä
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                {myTurn ? 'Sinä aloitat' : 'Toinen pelaaja aloittaa'}
              </Typography>
            </Grid>
          </Grid>
        )
        return <WaitingCard text={startText} />

      case 'endRound':
        return <WaitingCard text={<EndRound />} />
    }
  }
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item sm>
        <BrowserView>
          <LeaderBoard />
        </BrowserView>
        <MobileView>
          <MobileLeaderBoard />
        </MobileView>
      </Grid>
      <Grid item sm={8}>
        {Render()}
      </Grid>
      <Grid item sm={1}>
        <TimerProgress value={time} />
      </Grid>
    </Grid>
  )
}

export default Game
