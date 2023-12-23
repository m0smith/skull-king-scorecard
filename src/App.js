import logo from './assets/logo.png';
import './App.css';
import Scorecard from './components/Scorcard';
import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">      
        <AppBar >
          <Toolbar>
        <img src={logo} className="App-logo" alt="logo"/>
        <Typography typeof='h2' align='center'>
            Skull King Scorecard
        </Typography>
        </Toolbar>
      </AppBar>
      </header>

      <Scorecard />
    </div>
  );
}

export default App;
