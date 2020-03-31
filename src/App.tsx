import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pokemon from './Pokemon/Pokemon';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import { Box, Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {


  return (
    <Router>
      <Box className="App-header">
        <img className={'App-logo'} src={logo} alt="React"></img>
        <div style={{ fontSize: 32, marginRight: 22 }}>Max's React App</div>
        <Button style={{ height: 30, marginRight: 8 }} variant="contained" color="primary" component={Link} to="/pokemon">
          Pokemon API
        </Button>
        <Button style={{ height: 30 }} variant="contained" color="secondary" component={Link} to="/dijkstra">
          Dijkstra Visualizer
        </Button>
      </Box>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/pokemon">
          <Pokemon name={'test2'} />
        </Route>
        <Route path="/dijkstra">
          <PathfindingVisualizer />
        </Route>
        <Route path="/">
          <Pokemon name={'test2'} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
