import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import PlayerInfo from './PlayerInfo';
import ScoreCell from './ScoreCell';

const range = (size) => Array.from(Array(size).keys())



const PLAYERS = range(6).map((i) => ({
  name: `Player ${++i}`,
  scores: Array(10)}))

function copyPlayersInfo(playerInfoArray) {
  return playerInfoArray.map(playerInfo => {
    return {
      name: playerInfo.name,
      scores: [...playerInfo.scores]
    };
  });
}
  
const Scorecard = () => {
  const [playersInfo, setPlayersInfo] = useState(PLAYERS);
  
  const handleNameChange = (index, name) => {
    const newPlayersInfo = copyPlayersInfo(playersInfo);
    newPlayersInfo[index].name = name;
    setPlayersInfo(newPlayersInfo);
  };

  const handleScoreChange = (player, round, score) => {
    const newPlayersInfo = copyPlayersInfo(playersInfo);
    newPlayersInfo[player].scores[round] = score;
    console.log(newPlayersInfo[player])
    setPlayersInfo(newPlayersInfo)
  }

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
          {range(10).map((_, round) => (
            <TableRow key={round}>
              <TableCell component="th" scope="row">
                {round + 1}
              </TableCell>
              {playersInfo.map((info, index) => (
                <TableCell key={index}>
                 <ScoreCell round={round} playerIndex={index} info={info}
                            bid={null} trick={null} score={null} total={null} 
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
