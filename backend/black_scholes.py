import math
from scipy.stats import norm

"""
Default Values:
S = 42 # stock price
K = 40 # strike price
T = 0.5 # time to expiry (tau)
r = 0.1 # risk free interest rate
sig = 0.2 # volatility (sigma)

"""


def black_scholes_call(S=42,K=40,T=0.5,r=0.1,sig=0.2):
    discount = math.exp(-r * T)
    d1 = (math.log(S/K) + T*(r + (sig**2)/2)) / (sig * math.sqrt(T))
    d2 = d1 - (sig * math.sqrt(T))

    C = (S * norm.cdf(d1)) - (K * discount * norm.cdf(d2))
    return C

def black_scholes_put(S=42,K=40,T=0.5,r=0.1,sig=0.2):
    discount = math.exp(-r * T)
    d1 = (math.log(S/K) + T*(r + (sig**2)/2)) / (sig * math.sqrt(T))
    d2 = d1 - (sig * math.sqrt(T))

    P = (K * discount * norm.cdf(-d2)) - (S * norm.cdf(-d1))
    return P

def greek_vega(S,K,T,r,sig):
    d1 = (math.log(S/K) + T*(r + (sig**2)/2)) / (sig * math.sqrt(T))
    vega = S * norm.pdf(d1, 0, 1) * math.sqrt(T)
    return vega