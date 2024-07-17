import numpy as np


def binomial_call(S0=100,K=103,T=1,N=3,r=0.06,u=1.2,d=1/1.2):
    # first compute equation constants

    # first compute equation constants
    dt = T/N 
    p = (np.exp(r*dt) - d)/(u - d)
    discount = np.exp(-r * dt)

    #initialise array with stock prices
    C = S0 * u ** (np.arange(0,N+1,1)) * d ** (np.arange(N,-1,-1))

    #calculate option payoffs using vectors
    C = np.maximum(C-K, np.zeros(N+1))

    #iterate backwards and multiply vectors so that each index in previous step corresponds
    #to the same index times the one above it - hence the slicing
    for i in np.arange(N,0,-1):
        C = discount * (p * C[1:i+1] + (1-p) * C[0:i])
    
    return C[0].item()

