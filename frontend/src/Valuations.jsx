import React, { useState } from 'react';
import axios from 'axios';
import './Valuations.css';

function Valuations(){
    const [valuationTable, setValuationTable] = useState();
    // hard code ticker for now
    const ticker = {ticker:"amzn"}

    const renderTable = (table) => {
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

    const handleDisplay = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/realtime/valuations`, ticker);

            setValuationTable(response.data)
            renderTable(valuationTable)

        } catch (error) {
            console.error('Error fetching result:', error);
        }
    };


    return (
        <div className='Valuations'>
            <h2 className='Valuations-title'>Options Valuations</h2>
            <br></br>
            <button onClick={handleDisplay}>Display Valuations</button>

            <br></br>
            <h3>Data Table:</h3>
            {valuationTable ? renderTable(valuationTable) : <h3>Select Ticker & Press Display</h3>}
        </div>
    ) 
    
    
}

export default Valuations;