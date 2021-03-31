import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Player } from "../hooks/useGame";
import PersonIcon from "@material-ui/icons/Person";

interface Props {
  players: Player[];
}
const useStyles = makeStyles((theme) => ({
    user: {
      textAlign: 'left',
    },
  }));

const UserList = ({ players }: Props) => {
    const classes = useStyles();
  return (
    <div className={classes.user}>
      <Typography variant="h6" component="h6" gutterBottom>
        Pelaajat:
      </Typography>
      <List>
        {players.map((client) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={client.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
