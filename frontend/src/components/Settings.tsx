import { FormControlLabel, makeStyles, Slider, Switch, Typography } from "@material-ui/core";
import React, { useState } from "react";

interface Props {}

const useStyles = makeStyles((theme) => ({
    user: {
      textAlign: 'left',
    },
  }));

const Settings = (props: Props) => {
  const [time, setTime] = useState(60);
  const [state, setState] = React.useState({
    checkedAdult: true,
    checkedB: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const classes = useStyles();
  return (
    <div className={classes.user}>
        <Typography variant="h6" component="h6" gutterBottom>
        Asetukset
      </Typography>
      <Typography id="discrete-slider" gutterBottom>
        Aika: {time} s
      </Typography>
      <Slider
        defaultValue={30}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={120}
        value={time}
        onChange={(e, value) => setTime(value as number)}
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedAdult}
            onChange={handleChange}
            name="checkedAdult"
            color="primary"
          />
        }
        label="Aikuisten versio"
      />
    </div>
  );
};

export default Settings;
