import React, { useState, useRef } from 'react';
import { TextField, Box } from '@mui/material'
import { computeScore, computeSubtotal } from '../common'



const ScoreCell = ({ round, playerIndex, info, updateScore }) => {
  const boxRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [_bid, setBid] = useState(info.scores[round].bid)
  const [_tricks, setTricks] = useState(info.scores[round].tricks)




  const handleBlur = () => {
    // Delay checking for the blur event to allow time for focus to potentially shift to a new element
    setTimeout(() => {
      // Check if the newly focused element is outside the box
      if (boxRef.current && !boxRef.current.contains(document.activeElement)) {
        setIsFocused(false); // Focus has moved outside the box
        updateScore(playerIndex, round, _bid, _tricks)
      }
    }, 0);
  };

  const handleFocus = () => {
    setIsFocused(true); // Focus is within the box
  };


  return (
    <Box display="flex"
      flexDirection="column">
      <Box display="flex"
        ref={boxRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        tabIndex={-1} // Make the Box focusable
        style={{ border: isFocused ? '2px solid blue' : '1px solid grey' }}>
        <TextField
          label="Bid"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={_bid}
          onChange={(e) => setBid(Number(e.target.value))}
        />
        <TextField
          label="Tricks"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={_tricks}
          onChange={(e) => setTricks(Number(e.target.value))}
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
          value={computeScore(round, _bid, _tricks)}
          disabled
        />
        <TextField
          label="Total"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={computeSubtotal(info, round)}
          disabled
        />
      </Box>
    </Box>
  );
};

export default ScoreCell;
