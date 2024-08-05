import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Valuations.css';

function Valuations(){
    const [valuationTable, setValuationTable] = useState();
    const [ticker, setTicker] = useState('none');
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [marketStatus, setMarketStatus] = useState('OPEN');
    const [timerStatus, setTimerStatus] = useState(true) //true = play ; false = pause   

    const renderTable = (table) => {
        if (!table) return null;

        let rows = [];
        let columns = [];
        const keys = Object.keys(table);
        for(let i = 0; i < Object.keys(table[keys[0]]).length; i++){
            let row = {};
            keys.forEach(key => {
                row[key] = table[key][i];
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
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/realtime/valuations`, { ticker });
            setValuationTable(response.data);
        } catch (error) {
            console.error('Error fetching result:', error);
        }
        setLoading(false);
    };

    const getMarketStatus = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/realtime/marketstatus`);
            setMarketStatus(response.data.marketStatus) 
        } catch (error) {
            console.error('Error fetching pencil', error);
        }
    }

    const toggleTimer = () => {
        setTimerStatus(!timerStatus)
    };


    useEffect(() => {
        //TODO: uncomment below
        getMarketStatus();

        if (ticker === "none"){
            setValuationTable();
        }

        if (timerStatus) {
            getTable();
            setTimer(30);
        }
        
        // timer countdown
        if (timerStatus){
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1){
                        setValuationTable();
                        getTable();
                        return 30;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
            return () => clearInterval(intervalId);
        }
            

    }, [ticker, timerStatus]);
    

    // rendering page
    if (marketStatus === 'OPEN'){
        return (
            <div className='Valuations'>
                <h2 className='Valuations-title'>Options Valuations</h2>
    
                <div className='Valuations-inputs'>
                    <div className='Valuations-dropdown'>
                    <select
                        className='Valuations-select'
                        value={ticker} // ...force the select's value to match the state variable...
                        onChange={e => setTicker(e.target.value)} // update state variable
                    >
                        <option value="none">Select Ticker</option>
                        <option value="aapl">AAPL (Apple)</option>
                        <option value="amzn">AMZN (Amazon)</option>
                        <option value="nvda">NVDA (Nvidia)</option>
                        <option value="aal">AAL (American Airlines)</option>
                        <option value="hsbc">HSBC (HSBC)</option>
                    </select>
                    </div>
    
                    <div className='Valuations-toggletimer' >
                        { ticker !== "none" && <button onClick={toggleTimer}>{timerStatus ? 'Pause' : 'Play'}</button>}
                    </div>

                </div>
                
                <div className='Valuations-table'>
                    {ticker !== "none" && <h3 className='Valuations-timer'>Next update: {timer} seconds</h3>}
                    <h3 className='Valuations-calltitle'>Call Options - {ticker.toUpperCase()}:</h3>
                    {/*valuationTable ? renderTable(valuationTable) : <h3>Select Ticker & Press Display</h3>*/}
                    {loading ? <h4>Loading...</h4> : renderTable(valuationTable) || <h4>Select Ticker & Press Display</h4>}
                </div>
                
            </div>
        );
    }
    else{
        return (
            <div className='Valuations'>
                <h2 className='Valuations-title'>Options Valuations</h2>
    
                <h3>Market is closed.</h3>
                
            </div>
        );
    }
    
}

export default Valuations;