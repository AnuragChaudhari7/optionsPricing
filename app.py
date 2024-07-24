from flask import Flask, request, jsonify
from models.binomial_european import binomial_call
from models.binomial_european import binomial_put_from_call
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

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


if __name__ == '__main__':
    app.run(debug=True)