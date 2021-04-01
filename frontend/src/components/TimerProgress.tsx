import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useGame from "../hooks/useGame";

export default function TimerProgress(
  props: CircularProgressProps & { value: number }
) {
  const normalise = (value: number) =>
    ((value - 0) * 100) / (settings.time - 0);
  const { settings } = useGame();
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${props.value}s`}</Typography>
      </Box>
    </Box>
  );
}
