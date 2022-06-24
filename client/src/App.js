import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import Search from './components/Search.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes path="/">
          <Route index element={<Home />} />
          <Route path="search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
