import React from 'react';
import { TextField, Box } from '@mui/material';

const ScoreCell = ({ round, playerIndex, bid, trick, score, total, updateScore }) => {
  const handleBidChange = (event) => {
    updateScore(playerIndex, round, 'bid', event.target.value);
  };

  const handleTrickChange = (event) => {
    updateScore(playerIndex, round, 'trick', event.target.value);
  };

  // Additional functions to handle score and total updates can be added here

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex">
        <TextField
          label="Bid"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={bid}
          onChange={handleBidChange}
        />
        <TextField
          label="Trick"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={trick}
          onChange={handleTrickChange}
        />
      </Box>
      <Box display="flex">
        <TextField
          label="Score"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={score}
          disabled
        />
        <TextField
          label="Total"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={total}
          disabled
        />
      </Box>
    </Box>
  );
};

export default ScoreCell;
