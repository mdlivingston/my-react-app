import { Box, Button } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './App.css';
import logo from './logo.svg';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import Pokemon from './Pokemon/Pokemon';
import Random from './Random/random';
import PrivateRoute from './Vault/PrivateRoute'
import ForgotPassword from './Vault/ForgotPassword'
import UpdateProfile from './Vault/UpdateProfile'
import Signup from "./Vault/Signup";
import Dashboard from "./Vault/Dashboard"
import Login from './Vault/Login'
import { AuthProvider } from "./Vault/context/AuthContext";
import { Container } from 'react-bootstrap'

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
        <span style={{ flex: 1 }}></span>
        <Button style={{ height: 30, marginRight: 8 }} variant="contained" component={Link} to="/dashboard">
          Vault
        </Button>
      </Box>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <AuthProvider>
        <Switch>

          <Route path="/pokemon">
            <Pokemon />
          </Route>

          <Route path="/dijkstra">
            <PathfindingVisualizer />
          </Route>

          <Route path="/random">
            <Random name={'test2'} />
          </Route>

          <Container
            className="d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
              <PrivateRoute path="/update-profile" component={UpdateProfile}></PrivateRoute>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </div>
          </Container>

          <Route path="/">
            <Pokemon />
          </Route>

        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
