from flask import Flask, render_template, request, jsonify
from models.binomial_european import binomial_call
from models.binomial_european import binomial_put_from_call
from time import time

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    call_price = None
    put_price = None
    if request.method == 'POST':

        S0 = float(request.form['S0'])
        K = float(request.form['K'])
        T = float(request.form['T'])
        N = int(request.form['N'])
        r = float(request.form['r'])
        u = float(request.form['u'])

        call_price = binomial_call(S0=S0, K=K, T=T, N=N, r=r, u=u, d=1/u) #currently default values in funciton
        put_price = binomial_put_from_call(C=call_price,S0=S0,K=K,T=T,r=r)

        call_price = round(call_price,2)
        put_price = round(put_price,2)

    return render_template('index.html', call_price=call_price, put_price = put_price)

if __name__ == '__main__':
    app.run(debug=True)