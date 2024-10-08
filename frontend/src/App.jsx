import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Binomial from './Binomial';
import BlackScholes from './BlackScholes';
import Valuations from './Valuations';

function App() {
  return (
    <Router>
    <div className="App">
        <header className="App-header">
          <h1 className='App-title'><Link to="/">Options Pricing Models</Link></h1>
            <nav className="App-nav">
              <Link to="/">Home</Link>
              <Link to="/binomial">Binomial</Link>
              <Link to="/blackscholes">Black-Scholes</Link>
              <Link to="/valuations">Real-Time Valuations</Link>
            </nav>
            
        </header>
        <main className="App-main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/binomial" element={<Binomial />} />
                <Route path="/blackscholes" element={<BlackScholes />} />
                <Route path="/valuations" element={<Valuations />} />
            </Routes>
        </main>
    </div>
    </Router> 
  );
}

export default App;
