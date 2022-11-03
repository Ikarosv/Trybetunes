import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
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
          <Route
            exact
            path="/album/:id"
            render={ () => <Album /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
