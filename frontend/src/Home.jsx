import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Home.css'

function Home() {
    return (
        <div className='Home'>
            <h2>Welcome to the Options Pricing App</h2>

            <p>The purpose of this app is to provide various Derivative Pricing Models that can be used
                to determine the fair price of an option. Here are some of the features of this site.
            </p>
            <ol>
                <li><Link className='Home-link' to="/binomial">Binomial Tree Model</Link></li>
                <p>The Binomial Tree Model generates a binomial tree of 'N' steps to 
                    predict stock movement and hence derive the fair price of the option.
                    This is a discrete time model. 
                </p>

                <li><Link className='Home-link' to="/blackscholes">Black-Scholes</Link></li>
                <p>The Black Scholes model involves generating the Black-Scholes partial 
                    differential equation (PDE) from theories within stochastic calculus. And then 
                    by solving the PDE, we can obtain the fair-price of the option.
                    This is a continuous time model.
                    <br/><br/>
                    <b>Fun Fact: </b> the Black-Scholes model is actually just a Binomial Tree model except
                    the number of time steps tends to infinity. Hence its continuous nature. 
                </p>

                <li><Link className='Home-link' to="/valuations">Real-Time Option Valuations</Link></li>
                <p>
                    This section displays real-time call/put option chain data for a few given tickers. It displays the 
                    data for them including the valuation of the option. It updates every 30 seconds and 
                    can be paused for data inspection. 
                    <br />
                </p>
            </ol>
        <p>
            Each section has an API endpoint established if you'd like to use it. Please see the 
            <a href='https://github.com/AnuragChaudhari7/optionsPricing'>Github</a> for documentation.
        </p>
        </div>
    );
}

export default Home;