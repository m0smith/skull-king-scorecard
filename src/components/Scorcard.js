import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PlayerInfo from './PlayerInfo';
import ScoreCell from './ScoreCell';
import {range, PROJECT_NAME} from '../common'



const loadGameInfo = () => {
  return JSON.parse(localStorage.getItem(PROJECT_NAME));
}

const DEFAULT_ROUNDS = 10
const DEFAULT_PLAYERS = 6

const scoresArray = (n) => Array.from({ length: n}, (_, index) => ({
  bid: null,
  tricks: null,
  round: index
}));


const PLAYERS = range(DEFAULT_PLAYERS).map((i) => ({
  name: `Player ${++i}`,
  scores: scoresArray(DEFAULT_ROUNDS)}))

function copyPlayersInfo(playerInfoArray) {
  return playerInfoArray.map(playerInfo => {
    return {
      name: playerInfo.name,
      scores: playerInfo.scores.map(score => ({
        bid: score?.bid,
        tricks: score?.tricks,
        round: score?.round
      }))
    };
  });
}
  
const Scorecard = ({key}) => {
  const [playersInfo, setPlayersInfo] = useState(loadGameInfo() || PLAYERS);
  // const [_, setParentKey] = useState(key)
  
  const handleNameChange = (index, name) => {
    const newPlayersInfo = copyPlayersInfo(playersInfo);
    newPlayersInfo[index].name = name;
    setPlayersInfo(newPlayersInfo);
  };

  const handleScoreChange = (player, round, bid, tricks) => {
    const newPlayersInfo = copyPlayersInfo(playersInfo);
    newPlayersInfo[player].scores[round] = {
      bid, tricks, round
    }
    console.log(newPlayersInfo[player])
    setPlayersInfo(newPlayersInfo)
  }

  useEffect(()=> {
    localStorage.setItem(PROJECT_NAME, JSON.stringify(playersInfo));
  }, [playersInfo])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="scorecard table">
        <TableHead>
          <TableRow>
            <TableCell>Round</TableCell>
            {playersInfo.map((info, index) => (
              <TableCell key={index}>
                <PlayerInfo info={info} index={index}  onNameChange={handleNameChange}/>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {range(DEFAULT_ROUNDS).map((_, round) => (
            <TableRow key={round}>
              <TableCell component="th" scope="row">
                {round + 1}
              </TableCell>
              {playersInfo.map((info, index) => (
                <TableCell key={index}>
                 <ScoreCell round={round} playerIndex={index} info={info}
                            updateScore={handleScoreChange} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Scorecard;
