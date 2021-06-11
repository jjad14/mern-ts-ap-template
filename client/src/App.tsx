import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Homepage from './components/HomePage/Homepage';
import LoginPage from './components/LoginPage/LoginPage';
import './GlobalStyles.css'
import { myContext } from './Context';

const App = () => {
  const userObject = useContext(myContext);
  
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
