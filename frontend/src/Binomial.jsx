import React, { useState } from 'react';
import axios from 'axios';
import './Binomial.css'

function Binomial() {
    const [inputs, setInputs] = useState({ S0: '42', K: '40', T: '0.5', N: '4', r: '0.1', sig: '0.2'});
    const [CallPrice, setCallPrice] = useState(null);
    const [PutPrice, setPutPrice] = useState(null);
    const [errors, setErrors] = useState({ S0: '', K: '', T: '', N: '', r: '', sig: ''});

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
        if (!inputs.S0) newErrors.S0 = 'S0 is required';
        if (!inputs.K) newErrors.K = 'K is required';
        if (!inputs.T) newErrors.T = 'T is required';
        if (!inputs.N) newErrors.N = 'N is required'; //TODO: input validate integer (separate error)
        if (!inputs.r) newErrors.r = 'r is required';
        if (!inputs.sig) newErrors.sig = '\u03C3 is required';
        return newErrors;
    };

    const handleCalculate = async () => {

        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/european/binomial`, inputs);
            setCallPrice(response.data.callPrice); //TODO: Add put price later to result
            setPutPrice(response.data.putPrice);
        } catch (error) {
            console.error('Error fetching result:', error);
        }
    };

    return (
        <div className="Binomial">
            <h2 className='Binomial-title'>European Options - Binomial Model</h2>

            <label htmlFor="S0" >Initial Stock Price $S0: </label>
            <input
                type="number"
                name="S0"
                value={inputs.S0}
                onChange={handleInputChange}
                placeholder="$S0 - Stock Price"
            />
            {errors.S0 && <span style={{ color: 'red', fontSize: "15px"}}>{errors.S0}</span>}

            <br></br>

            <label htmlFor="K" >Strike Price $K: </label>
            <input
                type="number"
                name="K"
                value={inputs.K}
                onChange={handleInputChange}
                placeholder="$K - Strike Price"
            />
            {errors.K && <span style={{ color: 'red', fontSize: "15px"}}>{errors.K}</span>}

            <br></br>

            <label htmlFor="T" >Time to Expiry (years) T: </label>
            <input
                type="number"
                name="T"
                value={inputs.T}
                onChange={handleInputChange}
                placeholder="$T - Expiry Time"
            />
            {errors.T && <span style={{ color: 'red', fontSize: "15px"}}>{errors.T}</span>}

            <br></br>
            
            <label htmlFor="N" >Binomial Tree Steps N: </label>
            <input
                type="number" //TODO: integer type?
                name="N"
                value={inputs.N}
                onChange={handleInputChange}
                placeholder="$N - B.Tree Steps"
                
            />
            {errors.N && <span style={{ color: 'red', fontSize: "15px"}}>{errors.N}</span>}

            <br></br>

            <label htmlFor="r" >Interest Rate (decimal) r: </label>
            <input
                type="number"
                name="r"
                value={inputs.r}
                onChange={handleInputChange}
                placeholder="$r - Interest Rate"
            />
            {errors.r && <span style={{ color: 'red', fontSize: "15px"}}>{errors.r}</span>}

            <br></br>

            <label htmlFor="sig" >Volatility &sigma;: </label>
            <input
                type="number"
                name="sig"
                value={inputs.sig}
                onChange={handleInputChange}
                placeholder="$&sigma; - Volatility"
            />
            {errors.sig && <span style={{ color: 'red', fontSize: "15px"}}>{errors.sig}</span>}

            <br></br>
            
            <button onClick={handleCalculate}>Calculate</button>
            {<p>Call Price: ${CallPrice}</p>}
            {<p>Put Price: ${PutPrice}</p>}
        </div>
    );
}

export default Binomial;