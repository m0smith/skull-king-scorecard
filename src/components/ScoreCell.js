import React, { useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';

const computeScore = (round, bid, tricks) => {
  if(!isNaN(bid)  && !isNaN(tricks) > 0) {
    if(bid === tricks) {
      return ((round +1) * 20)
    } else {
      return(Math.abs(bid - tricks) * -10)
    }
  }
}

const ScoreCell = ({ round, playerIndex, bid, tricks, total, updateScore }) => {
  const [_bid, setBid] = useState(bid)
  const [_tricks, setTricks] = useState(tricks)

  const [score , setScore] = useState(computeScore(round, _bid, _tricks))


  const handleBidChange = (event) => {
    updateScore(playerIndex, round, 'bid', event.target.value);
  };

  const handleTrickChange = (event) => {
    updateScore(playerIndex, round, 'trick', event.target.value);
  };

  // Additional functions to handle score and total updates can be added here

  useEffect(() => {
    const newScore = computeScore(round, _bid, _tricks)
    console.log(newScore)
    setScore(newScore)
  }, [_bid, _tricks])

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
          value={_bid}
          onChange={(e) => setBid(e.target.value)}
        />
        <TextField
          label="Tricks"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={_tricks}
          onChange={(e) => setTricks(e.target.value)}
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
