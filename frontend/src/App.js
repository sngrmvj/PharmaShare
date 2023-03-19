import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Components/login/login';
import Signup from './Components/signup/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}></Route>
        <Route exact path='/register' element={<Signup/>}></Route>
        {/* <Route exact path='/menu' element={<MainMenu/>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
