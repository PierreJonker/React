import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Waiting from './components/Waiting';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
      <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/admin" component={Admin} roles={['admin']} />
          <Route path="/waiting" component={Waiting} />
          <Route path="/unauthorized" component={Unauthorized} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;