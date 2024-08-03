from flask import Flask, request, jsonify
from flask_cors import CORS

from binomial_european import binomial_call
from binomial_european import binomial_put_from_call
from black_scholes import black_scholes_call
from black_scholes import black_scholes_put
from binomial_american import american_binomial_put
from valuations import get_valuations

app = Flask(__name__)
CORS(app)

# EUROPEAN BINOMIAL 
@app.route('/api/european/binomial', methods=['POST'])
def european_binomial():
    data = request.get_json()
    S0 = float(data.get('S0'))
    K = float(data.get('K'))
    T = float(data.get('T'))
    N = int(data.get('N'))
    r = float(data.get('r'))
    sig = float(data.get('sig'))
    
    call_price = binomial_call(S0=S0, K=K, T=T, N=N, r=r,sig=sig)
    put_price = binomial_put_from_call(C=call_price,S0=S0,K=K,T=T,r=r)
    result = {"callPrice": round(call_price, 2), "putPrice": round(put_price, 2)}
    return jsonify(result)

# EUROPEAN BLACK SCHOLES
@app.route('/api/european/blackscholes', methods=['POST'])
def european_blackscholes():
    data = request.get_json()
    S = float(data.get('S'))
    K = float(data.get('K'))
    T = float(data.get('T'))
    r = float(data.get('r'))
    sig = float(data.get('sig'))

    call_price = black_scholes_call(S=S,K=K,T=T,r=r,sig=sig)
    put_price = black_scholes_put(S=S,K=K,T=T,r=r,sig=sig)
    result = {"callPrice": round(call_price, 2), "putPrice": round(put_price, 2)}
    return jsonify(result)

@app.route('/api/american/binomial', methods=['POST'])
def american_binomial():
    data = request.get_json()
    S0 = float(data.get('S0'))
    K = float(data.get('K'))
    T = float(data.get('T'))
    N = int(data.get('N'))
    r = float(data.get('r'))
    sig = float(data.get('sig'))

    # for american options use black-scholes for call (assume no dividends paid out)
    call_price = black_scholes_call(S=S0,K=K,T=T,r=r,sig=sig)
    put_price = american_binomial_put(S0=S0,K=K,T=T,N=N,r=r,sig=sig)
    result = {"callPrice": round(call_price, 2), "putPrice": round(put_price, 2)}
    return jsonify(result)

@app.route('/api/realtime/valuations', methods=['POST'])
def realtime_valuations():
    data = request.get_json()
    ticker = str(data.get('ticker'))
    print(f'ticker: {ticker}')
    valuations_df = get_valuations(ticker)
    if valuations_df.shape[0] > 0:
        print(f"dataframe populated {valuations_df.head(3)}")
    return valuations_df.to_json()

if __name__ == '__main__':
    app.run(debug=True)