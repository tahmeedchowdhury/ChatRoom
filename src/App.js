import React,{useState} from 'react';
import Login from './res/jsx/Login';
import NavBar from './res/jsx/NavBar';
import Main from './res/jsx/Main';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

function App() {




  return (
    <div className="App">
      <Main></Main>
      <NavBar></NavBar>
      <Login></Login> 
    </div>
  );
}
export default App;
