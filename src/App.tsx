import { Box, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './App.css';
import logo from './logo.svg';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import Pokemon from './Pokemon/Pokemon';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function createData(name: string, calories: number, fat: number, carbs: number, protein: number)
{
  return { name, calories, fat, carbs, protein };
}



const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function App()
{
  const classes = useStyles();

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
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
