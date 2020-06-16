import { Box, Button } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './App.css';
import logo from './logo.svg';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import Pokemon from './Pokemon/Pokemon';
import Random from './Random/random';




function App()
{

  return (
    <Router>
      <Box className="App-header">
        <img className={'App-logo'} src={logo} alt="React"></img>
        <div style={{ fontSize: 32, marginRight: 22 }}>Max's React App</div>
        <Button style={{ height: 30, marginRight: 8 }} variant="contained" color="primary" component={Link} to="/pokemon">
          Pokemon API
        </Button>
        <Button style={{ height: 30, marginRight: 8 }} variant="contained" color="secondary" component={Link} to="/dijkstra">
          Dijkstra Visualizer
        </Button>
        <Button style={{ height: 30, marginRight: 8 }} variant="contained" component={Link} to="/random">
          Random
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
        <Route path="/random">
          <Random name={'test2'} />
        </Route>
        <Route path="/">
          <Pokemon name={'test2'} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
