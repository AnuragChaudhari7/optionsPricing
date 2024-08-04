import React, { useState } from 'react';
import axios from 'axios';
import './Valuations.css';

function Valuations(){
    const [valuationTable, setValuationTable] = useState();
    const [ticker, setTicker] = useState('aapl')

    const renderTable = (table) => {
        if (!table) return null;

        let rows = []
        let columns = []
        const keys = Object.keys(table);
        for(let i = 0; i < Object.keys(table[keys[0]]).length; i++){
            let row = {};
            keys.forEach(key => {
                row[key] = table[key][i]
            });
            rows.push(row);
        }
        columns = keys;

        return (<table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td key={column}>{row[column]}</td>
                        ))}
                    </tr>
                ))}         
            </tbody>
        </table>);
    }

    const getTable = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/realtime/valuations`, {ticker:ticker});
            setValuationTable(response.data)
        } catch (error) {
            console.error('Error fetching result:', error);
        }
    };



    return (
        <div className='Valuations'>
            <h2 className='Valuations-title'>Options Valuations</h2>
            <br></br>

            <div className='Valuations-inputs'>
                <div className='Valuations-dropdown'>
                <select
                    className='Valuations-select'
                    value={ticker} // ...force the select's value to match the state variable...
                    onChange={e => setTicker(e.target.value)} // update state variable
                >

                    <option value="aapl">AAPL (Apple)</option>
                    <option value="amzn">AMZN (Amazon)</option>
                    <option value="nvda">NVDA (Nvidia)</option>
                    <option value="aal">AAL (American Airlines)</option>
                    <option value="hsbc">HSBC (HSBC)</option>
                </select>
                </div>

                <div className='Valuations-button' >
                    <button  onClick={getTable}>Display Valuations</button>
                </div>
            </div>
            
            <h3>Data Table:</h3>
            {/*valuationTable ? renderTable(valuationTable) : <h3>Select Ticker & Press Display</h3>*/}
            {renderTable(valuationTable) || <h4>Select Ticker & Press Display</h4>}

        </div>
    ) 
    
    
}

export default Valuations;