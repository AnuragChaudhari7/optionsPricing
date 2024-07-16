import numpy as np

# defining variables
S0 = 100    # initial stock price
K = 103     # strike price
T = 1       # time to maturity (years)
N = 3       # no. of time-steps
r = 0.06    # risk-free annual interest rate
u = 1.2     # up factor
d = 1/u     # down factor (inverse for recombining tree)
opt = 'C'   # options type (C - call ; P - put)

def binomial_fast(S0=100,K=103,T=1,N=3,r=0.06,u=1.2,d=1/u,opt='C'):
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

def binomial_slow(S0=100,K=103,T=1,N=3,r=0.06,u=1.2,d=1/u,opt='C'):
    # first compute equation constants
    dt = T/N 
    p = (np.exp(r*dt) - d)/(u - d)
    discount = np.exp(-r * dt)

    # numpy array to store the stock values at maturity
    S = np.zeros(N+1)
    S[0] = d**N * S0
    for j in range(1,N+1):
        S[j] = S0 * (u ** j) * (d ** (N-j))

    # numpy array to store options values at maturity'
    C = np.zeros(N+1)
    for j in range(0,N+1):
        C[j] = max(0,S[j] - K)
    
    # now let's move backwards through the tree
    for i in np.arange(N,0,-1):
        for j in range(0,i):
            # replace the cell in the nparray with the backwards contract calculation of itself and the one above
            # essentially knocking off the top element            
            C[j] = discount * (p * C[j+1] + (1-p) * C[j]) 
    
    return C[0].item()

