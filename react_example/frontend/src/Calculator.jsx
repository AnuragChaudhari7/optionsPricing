import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
    const [inputs, setInputs] = useState({ input1: '', input2: '' });
    const [addResult, setAddResult] = useState(null);
    const [multiplyResult, setMultiplyResult] = useState(null);
    const [errors, setErrors] = useState({ input1: '', input2: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!inputs.input1) newErrors.input1 = 'Input 1 is required';
        if (!inputs.input2) newErrors.input2 = 'Input 2 is required';
        return newErrors;
    };

    const handleAdd = async () => {

        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/add', inputs);
            setAddResult(response.data.result);
        } catch (error) {
            console.error('Error fetching addition result:', error);
        }
    };

    const handleMultiply = async () => {

        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
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
            {errors.input1 && <span style={{ color: 'red', fontSize: "15px"}}>{errors.input1}</span>}

            <br></br>

            <input
                type="number"
                name="input2"
                value={inputs.input2}
                onChange={handleInputChange}
                placeholder="Input 2"
            />
            {errors.input2 && <span style={{ color: 'red', fontSize: "15px"}}>{errors.input2}</span>}

            <br></br>

            <button onClick={handleAdd}>Add</button>
            <button onClick={handleMultiply}>Multiply</button>
            {<p>Addition Result: {addResult}</p>}
            {<p>Multiplication Result: {multiplyResult}</p>}
        </div>
    );
}

export default Calculator;