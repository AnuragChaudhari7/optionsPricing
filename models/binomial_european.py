import numpy as np
import math

def binomial_call(S0=100,K=103,T=1,N=3,r=0.06,sig=0.2):
    # first compute equation constants
    dt = T/N 
    u = math.exp(sig * math.sqrt(dt))
    d = 1/u
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

def binomial_put_from_call(C,S0=100,K=103,T=1,r=0.06):
    discount = np.exp(-r * T)
    P = C + (K * discount) - S0
    return P