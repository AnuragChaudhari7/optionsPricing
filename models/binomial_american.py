import numpy as np
import math

def american_binomial_put(S0=100,K=103,T=1,N=3,r=0.06,sig=0.2):
    dt = T/N 
    u = math.exp(sig * math.sqrt(dt))
    d = 1/u
    p = (np.exp(r*dt) - d)/(u - d)
    discount = np.exp(-r * dt)
    
    S = S0 * u ** (np.arange(0,N+1,1)) * d ** (np.arange(N,-1,-1))

    C = np.maximum(K - S, np.zeros(N+1))
    
    for i in range(N-1,-1,-1):
        S = S0 * u ** (np.arange(0,i+1,1)) * d ** (np.arange(i,-1,-1)) # calculate stock prices at layer
        C[:i+1] = discount * ( p*C[1:i+2] + (1-p)*C[0:i+1] ) # calculate payoff for each node
        C = C[:-1] # knocks off last element to save memory

        C = np.maximum(C, K - S) # check if exercised payoff is better than discount

    return C[0]

#print(american_binomial_put().item())