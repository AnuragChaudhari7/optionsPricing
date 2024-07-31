import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Home.css'

function Home() {
    return (
        <div className='Home'>
            <h2>Welcome to the Options Pricing App</h2>

            <p>The purpose of this app is to provide various Derivative Pricing Models that can be used
                to determine the fair price of an option. Currently there are 2 models present.
            </p>
            <ol>
                <li><Link className='Home-link' to="/binomial">Binomial Tree Model</Link></li>
                <p>The Binomial Tree Model generates a binomial tree of 'N' steps to 
                    predict stock movement and hence derive the fair price of the option. <br/>
                    This is a discrete time model. 
                </p>

                <li><Link className='Home-link' to="/blackscholes">Black-Scholes</Link></li>
                <p>The Black Scholes model involves generating the Black-Scholes partial 
                    differential equation (PDE) from theories within stochastic calculus. And then 
                    by solving the PDE, we can obtain the fair-price of the option. <br/>
                    This is a continuous time model.
                    <br/>
                    <b>Fun Fact: </b> the Black-Scholes model is actually just a Binomial Tree model except
                    the number of time steps tends to infinity. Hence its continuous nature. 
                </p>
            </ol>
        <p>Please note that if the server is just spooling up then the results for the model may
            take around a minute to display, so please be patient and refresh the page after a minute.
        </p>
        </div>
    );
}

export default Home;