import React from 'react';
import './Home.css'

function Home() {
    return (
        <div className='Home'>
            <h2>Welcome to the Options Pricing App</h2>
            <p>The purpose of this app is to provide various Derivative Pricing Models that can be used
                to determine the fair price of an option. Currently there are 2 models present.
            </p>
            <ol>
                <li><a href='https://optionspricing-frontend.onrender.com/binomial'>Binomial Tree Model</a></li>
                <p>The Binomial Tree Model generates a binomial tree of 'N' steps to predict stock movement and 
                    hence derive the fair price of the option</p>
                <li><a href='https://optionspricing-frontend.onrender.com/blackscholes'>Black-Scholes Model</a></li>
                <p>The Black Scholes model is in the context of continuous time models. Its similar to the Binomial Tree 
                    model except the time steps between each stock movement tends to infinity, creating a continuous movement.
                    This model involves solving a Partial Differential Eqation.
                </p>
            </ol>

        </div>
    );
}

export default Home;