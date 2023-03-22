import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Components/login/login';
import Signup from './Components/signup/signup';
import SupplierMenu from './Components/Supplier menu/supplier_menu';
import ViewRequest from './Components/ViewRequest/ViewRequest';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}></Route>
        <Route exact path='/register' element={<Signup/>}></Route>
        <Route exact path='/suppliermenu' element={<SupplierMenu/>}></Route>
        <Route exact path='/viewrequest' element={<ViewRequest/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
