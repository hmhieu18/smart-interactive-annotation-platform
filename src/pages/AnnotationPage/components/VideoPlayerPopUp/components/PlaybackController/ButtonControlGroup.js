import React from 'react'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { emphasize } from "@material-ui/core/styles/colorManipulator";

import PlayIcon from '@material-ui/icons/PlayArrowRounded';
import PauseIcon from '@material-ui/icons/PauseRounded';
import SkipNextIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousIcon from '@material-ui/icons/SkipPreviousRounded';
import PreviousIcon from '@material-ui/icons/ArrowBackRounded';
import NextIcon from '@material-ui/icons/ArrowForwardRounded';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  button: {
    minWidth: 30,
    minHeight: 30,
    margin: 5,
    borderRadius: 100,
    backgroundColor: theme.palette.primary.light,
    "&:hover, &:focus": {
      //gray color
      backgroundColor: emphasize(theme.palette.primary.light, 0.2),
    }
  }
}))

const ButtonControlGroup = (props) => {
  const classes = useStyles()
  const { isPlaying, handleSkipFrame, handleClickPlay, handleClickPause, } = props

  return (
    <Grid container item xs={3} className={classes.root}>
      <Button size="small" color="secondary" onClick={handleSkipFrame(-10)} className={classes.button}>
        <SkipPreviousIcon fontSize="small" />
      </Button>
      {!isPlaying ?
        <Button size="small" color="secondary" onClick={handleClickPlay} className={classes.button}>
          <PlayIcon fontSize="small" />
        </Button>
        :
        <Button size="small" color="secondary" onClick={handleClickPause} className={classes.button}>
          <PauseIcon fontSize="small" />
        </Button>
      }
      <Button size="small" color="secondary" onClick={handleSkipFrame(10)} className={classes.button}>
        <SkipNextIcon fontSize="small" />
      </Button>
    </Grid>
  )
}

export default ButtonControlGroup