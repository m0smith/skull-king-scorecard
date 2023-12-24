import React, { useEffect, useState, useRef } from 'react';
import { TextField, Box } from '@mui/material';

const computeScore = (round, bid, tricks) => {
  if (!isNaN(bid) && !isNaN(tricks) > 0) {
    if (bid === tricks) {
      return ((round + 1) * 20)
    } else {
      return (Math.abs(bid - tricks) * -10)
    }
  }
}

function computeSubtotal(playerInfo, round) {
  const rtnval = playerInfo.scores.slice(0, round + 1).reduce((accumulator, currentScore) => {
      if (isNaN(currentScore))
          return accumulator;
      else
          return accumulator + currentScore
  }, 0)
  return rtnval
}


const ScoreCell = ({ round, playerIndex, info,  bid, tricks, total, updateScore }) => {
  const boxRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [_bid, setBid] = useState(bid)
  const [_tricks, setTricks] = useState(tricks)

  const [score, setScore] = useState(computeScore(round, _bid, _tricks))



  const handleBlur = (event) => {
    // Delay checking for the blur event to allow time for focus to potentially shift to a new element
    setTimeout(() => {
      // Check if the newly focused element is outside the box
      if (boxRef.current && !boxRef.current.contains(document.activeElement)) {
        setIsFocused(false); // Focus has moved outside the box
        updateScore(playerIndex, round, score)
      }
    }, 0);
  };

  const handleFocus = () => {
    setIsFocused(true); // Focus is within the box
  };

  useEffect(() => {
    const newScore = computeScore(round, _bid, _tricks)
    console.log(newScore)
    setScore(newScore)
  }, [_bid, _tricks, round])

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
          value={computeSubtotal(info, round)}
          disabled
        />
      </Box>
    </Box>
  );
};

export default ScoreCell;
