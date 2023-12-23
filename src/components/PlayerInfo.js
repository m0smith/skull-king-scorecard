import { Box, TextField } from "@mui/material"
import { useState } from "react"

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
                value={info.score}
                variant="standard"
                disabled
                fullWidth
                inputProps={{ readOnly: true }}
            />
        </Box>

    )
}

export default PlayerInfo