import { Box, TextField } from "@mui/material"
import { useState } from "react"

function sumScores(playerInfo) {
    const rtnval = playerInfo.scores.reduce((accumulator, currentScore) => {
        if (isNaN(currentScore))
            return accumulator;
        else
            return accumulator + currentScore
    }, 0)
    return rtnval
}

const PlayerInfo = ({ info, index, onNameChange }) => {
    const [tempName, setTempName] = useState(info.name)

    const handleNameChange = (e) => {
        setTempName(e.target.value)
    }

    const applyNameChange = () => {
        onNameChange(index, tempName);
    };

    return (
        <Box display="flex">

            <TextField
                value={tempName}
                onChange={(e) => handleNameChange(e)}
                onBlur={applyNameChange}
                variant="standard"
                fullWidth
            />
            <TextField
                value={sumScores(info)}
                variant="standard"
                disabled
                fullWidth
                inputProps={{ readOnly: true }}
            />
        </Box>

    )
}

export default PlayerInfo