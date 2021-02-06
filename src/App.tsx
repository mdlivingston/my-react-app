import { Box, Button } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './App.css';
import logo from './logo.svg';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import Pokemon from './Pokemon/Pokemon';
import Random from './Random/random';
import PrivateRoute from './Vault/auth/PrivateRoute'
import ForgotPassword from './Vault/auth/ForgotPassword'
import UpdateProfile from './Vault/auth/UpdateProfile'
import Signup from "./Vault/auth/Signup";
import Profile from "./Vault/auth/Profile"
import Login from './Vault/auth/Login'
import { AuthProvider } from "./Vault/context/AuthContext";
import EditorComp from './Editor/Editor';
import Dashboard from './Vault/google-drive/Dashboard';

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
        <Button style={{ height: 30, marginRight: 8, backgroundColor: 'lightblue' }} variant="contained" component={Link} to="/editor">
          Editor
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

          <Route path="/editor">
            <EditorComp />
          </Route>

          <Route path="/random">
            <Random name={'test2'} />
          </Route>

          <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
          <PrivateRoute exact path="/folder/:folderId" component={Dashboard}></PrivateRoute>
          <PrivateRoute path="/user" component={Profile}></PrivateRoute>
          <PrivateRoute path="/update-profile" component={UpdateProfile}></PrivateRoute>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />

          <Route exact path="/">
            <Pokemon />
          </Route>

        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
