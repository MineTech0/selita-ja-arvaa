import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useGame from '../hooks/useGame';
import AdminLobby from './AdminLobby'

import PlayerLobby from './PlayerLobby';


const Lobby = () => {
  const admin = true;
    return (
    <>
            {admin ? <AdminLobby/> : <PlayerLobby/> }

      </>
    )
}

export default Lobby
