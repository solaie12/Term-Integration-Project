import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
 

import SignInSide from "./components/auth/SinginSide";
import SignUp from "./components/auth/SingUp";
import {Dashboard} from "./components/Dashboard/Dashboard"

import { HashRouter, Routes, Route } from "react-router-dom";
import UploadFile from './components/upload';


ReactDOM.render(
  <HashRouter>
        <Routes>
          <Route path="/" element={<App />} /> 
          <Route path="/login" element={<App />} /> 
          <Route path="/upload" element={<UploadFile />} /> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </HashRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
