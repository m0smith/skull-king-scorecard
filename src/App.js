import logo from './assets/logo.png';
import './App.css';
import Scorecard from './components/Scorcard';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { PROJECT_NAME } from './common'
import { useState } from 'react';

function App() {
  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey(prevKey => prevKey + 1); // Change the key to force re-render
  };

  const handleClearData = () => {
    localStorage.removeItem(PROJECT_NAME)
    reloadComponent()

  };
  return (
    <div className="App">
      <header className="App-header">
        <AppBar >
          <Toolbar>
            <img src={logo} className="App-logo" alt="logo" />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Skull King Scorecard
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Button color="inherit" onClick={handleClearData}>
                Reset
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </header>

      <Scorecard key={key}/>
    </div>
  );
}

export default App;
