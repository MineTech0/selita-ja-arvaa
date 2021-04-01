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
  import StarIcon from '@material-ui/icons/Star';
  
  const useStyles = makeStyles((theme) => ({
    list: {
        display: 'flex',
        flexDirection: 'row',
    },
    paper: {
        maxWidth: '88vw',
        width: 'auto',
        textAlign: 'center',
        overflow:'scroll',
    },
    item: {
        width: 150
    }
    
  }));
  function MobileLeaderBoard(): ReactElement {
    const classes = useStyles();
  const { state } = useGame()
    return (
    <Paper elevation={3} className={classes.paper}>
        <List className={classes.list}>
          {state.players.map((player) => (
            <ListItem key={player.id} className={classes.item}>
              <ListItemAvatar>
                <Avatar >
                  <PersonIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={player.name} secondary={player.points} />
              {player.admin ? <StarIcon fontSize="small"/> : null}
            </ListItem>
          ))}
        </List>
    </Paper>
    );
  }
  
  export default MobileLeaderBoard;
  