import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const Scorecard = () => {
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6']);
  
  const handleNameChange = (index, event) => {
    const newNames = [...playerNames];
    newNames[index] = event.target.value;
    setPlayerNames(newNames);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="scorecard table">
        <TableHead>
          <TableRow>
            <TableCell>Round</TableCell>
            {playerNames.map((name, index) => (
              <TableCell key={index}>
                <TextField 
                  value={name} 
                  onChange={(e) => handleNameChange(index, e)} 
                  variant="standard" 
                  fullWidth
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(10)].map((_, round) => (
            <TableRow key={round}>
              <TableCell component="th" scope="row">
                {round + 1}
              </TableCell>
              {playerNames.map((_, index) => (
                <TableCell key={index}>
                  {/* Add your bid, tricks, score, and running total fields here */}
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
