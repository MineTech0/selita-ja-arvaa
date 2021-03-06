import {
  FormControlLabel,
  makeStyles,
  Slider,
  Switch,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { SettingsI } from "../../../hooks/gameTypes";


interface Props {
  setSettings: (settings: SettingsI) => void;
}

const useStyles = makeStyles((theme) => ({
  user: {
    textAlign: "left",
  },
}));

const Settings = ({setSettings}: Props) => {
  const [time, setTime] = useState(60);
  const [adult, setAdult] = useState(false);
  const [rounds, setRounds] = useState(5)

  useEffect(() => {
    setSettings({
      time,
      adult
    })
  }, [time, adult])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdult(event.target.checked);
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
      <Typography id="discrete-slider" gutterBottom>
        Kierrokset: {rounds}
      </Typography>
      <Slider
        defaultValue={5}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={30}
        value={rounds}
        onChange={(e, value) => setRounds(value as number)}
      />
      <FormControlLabel
        control={
          <Switch
            checked={adult}
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
