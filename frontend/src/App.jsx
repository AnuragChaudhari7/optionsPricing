import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/calculate', {
            input: Number(inputValue)
        });
        setResult(response.data.result);
    } catch (error) {
        console.error('Error fetching result:', error);
    }
  };

  return (
    <div className="App">
        <header className="App-header">
            <h1>Flask and React App</h1>
            <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Calculate</button>
            {result !== null && <p>Result: {result}</p>}
        </header>
    </div>
  );
}

export default App;
