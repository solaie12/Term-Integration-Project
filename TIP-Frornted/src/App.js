import React, { Component } from "react";
import Nav from "./components/nav";
import "./App.css"; 
import SignInSide from "./components/auth/SinginSide";
 
import Dashboard from "./components/Dashboard/Dashboard"

import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {
  // state = {  }
  render() {
    return (
      
      <SignInSide></SignInSide>
    
    );
  }
}

export default App;
