import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
    const [inputs, setInputs] = useState({ input1: '', input2: '' });
    const [addResult, setAddResult] = useState(null);
    const [multiplyResult, setMultiplyResult] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/add', inputs);
            setAddResult(response.data.result);
        } catch (error) {
            console.error('Error fetching addition result:', error);
        }
    };

    const handleMultiply = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/multiply', inputs);
            setMultiplyResult(response.data.result);
        } catch (error) {
            console.error('Error fetching multiplication result:', error);
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
            <br></br>
            <input
                type="number"
                name="input2"
                value={inputs.input2}
                onChange={handleInputChange}
                placeholder="Input 2"
            />
            <br></br>
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleMultiply}>Multiply</button>
            {addResult !== null && <p>Addition Result: {addResult}</p>}
            {multiplyResult !== null && <p>Multiplication Result: {multiplyResult}</p>}
        </div>
    );
}

export default Calculator;