import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getPosts } from '../api';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

const About = () => {
  return <h1>About</h1>;
};

const UserInfo = () => {
  return <h1>User</h1>;
};

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home posts={[]} />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/user/asdasd">
            <UserInfo />
          </Route>

          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
