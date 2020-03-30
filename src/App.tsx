import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './Counter/Counter';
import Pokemon from './Pokemon/Pokemon';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import { Box } from '@material-ui/core';

function App() {
  return (
    <React.Fragment>
      <Counter name={'test'} />
      <Pokemon name={'test2'} />
      <Box m={1}>
        <PathfindingVisualizer />
      </Box>
    </React.Fragment>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
