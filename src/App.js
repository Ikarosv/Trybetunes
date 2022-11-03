import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => <Login /> }
          />
          <Route
            exact
            path="/search"
            render={ () => <Search /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
