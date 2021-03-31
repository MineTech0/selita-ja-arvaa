import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import  PersonIcon  from "@material-ui/icons/Person";
import React, { ReactElement } from "react";
import useGame from "../hooks/useGame";

interface Props {}

const useStyles = makeStyles((theme) => ({
  card: {
    width: 240,
    height: 400,
  },
  box: {
    height: "100%",
  },
}));
const players = [{ name: "niilo", points: 6, id: "235" }];
function LeaderBoard({}: Props): ReactElement {
  const classes = useStyles();
  // const { state } = useGame()
  return (
    <Paper elevation={3} className={classes.card}>
      <List>
        {players.map((client) => (
          <ListItem key={client.id}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={client.name} secondary={client.points} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default LeaderBoard;
