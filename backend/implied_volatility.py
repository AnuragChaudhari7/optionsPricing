import math
from black_scholes import black_scholes_call
from black_scholes import greek_vega
from binomial_american import american_binomial_put

def newton_raphson(S, K, T, r, sig, P, tol=0.00001):
    '''
    S: Stock Price
    K: Strike Price
    T: Time to Expiry
    r: Risk-free interest rate
    sig: Initial volatility guess (decimal)
    P: Option Premium (Price)
    tol: I-V accuracy

    returns I-V as a decimal
    '''

    old_vol = sig

    for i in range(200):
        bs_price = black_scholes_call(S,K,T,r,old_vol)
        vega = greek_vega(S,K,T,r,old_vol)

        new_vol = old_vol - ((bs_price - P) / vega)
        
        # if within tolerance
        if abs(old_vol - new_vol) < tol:
            break

        old_vol = new_vol

    return new_vol

def bisection(S, K, T, r, sig, P, N, tol=0.00001):

    def difference(c):
        # functions y-axis 
        return american_binomial_put(S,K,T,N,r,c) - P
    
    # Define initial interval
    a, b = 0.01, 2*sig

    for i in range(200):
        c = (a + b) / 2

        if abs(difference(c)) < tol:
            # if root
            break
        
        # compare signs
        if difference(a) * difference(b) > 0:
            # same sign
            a = c
        else:
            b = c

    return c

#print(newton_raphson(30, 28, 0.5, 0.025, 0.3, 3.7))
print(bisection(30, 28, 0.5, 0.025, 0.3, 3.7, 100))