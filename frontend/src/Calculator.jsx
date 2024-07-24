import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
    // Initialize state with an object holding multiple input values
    const [inputs, setInputs] = useState({ input1: '', input2: '' });
    const [result, setResult] = useState(null);

    // Handle changes to input fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/calculate', inputs);
            setResult(response.data.result);
        } catch (error) {
            console.error('Error fetching result:', error);
        }
    };

    return (
        <div>
            <h1>Flask and React App</h1>
            <input
                type="number"
                name="input1"
                value={inputs.input1}
                onChange={handleInputChange}
                placeholder="Input 1"
            />
            <input
                type="number"
                name="input2"
                value={inputs.input2}
                onChange={handleInputChange}
                placeholder="Input 2"
            />
            <button onClick={handleSubmit}>Calculate</button>
            {result !== null && <p>Result: {result}</p>}
        </div>
    );
}

export default Calculator;