import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ ({ history }) => <Login history={ history } /> }
          />
          <Route
            exact
            path="/search"
            render={ () => <Search /> }
          />
          <Route
            exact
            path="/album/:id"
            render={ (propsRouter) => <Album { ...propsRouter } /> }
          />
          <Route
            exact
            path="/favorites"
            render={ () => <Favorites /> }
          />
          <Route
            exact
            path="/profile"
            render={ () => <Profile /> }
          />
          <Route
            exact
            path="/profile/edit"
            render={ () => <ProfileEdit /> }
          />
          <Route
            render={ () => <NotFound /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
