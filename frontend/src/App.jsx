import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Binomial from './Binomial';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <div className='header'>

//           <h1 className='Title'>Options Pricing Models</h1>

//           <nav className='Navigation'>
//             {/*TODO: add links to these*/}
//               <a href='http://127.0.0.1:3000'>Home1</a>
//               <a href='http://127.0.0.1:3000'>Home2</a>  

//           </nav>
          
//         </div>
//       </header>
      
//       <main>
//         <Binomial />
//       </main>
      
//     </div>
//   );
// }

function App() {
  return (
    <Router>
    <div className="App">
        <header className="App-header">
          <h1 className='App-title'>Options Pricing Models</h1>
            <nav className="App-nav">
                   <Link to="/">Home</Link>
                    <Link to="/binomial">Binomial</Link>
            </nav>
            
        </header>
        <main className="App-main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/binomial" element={<Binomial />} />
            </Routes>
        </main>
    </div>
    </Router> 
  );
}

export default App;
