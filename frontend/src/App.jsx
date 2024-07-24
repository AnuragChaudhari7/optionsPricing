import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Calculator from './Calculator';

function App() {

  return (
    <div className="App">
        <header className="App-header">
          <Calculator/>
        </header>
    </div>
  );
}

export default App;
