from flask import Flask, render_template, request, jsonify
from models.binomial_european import binomial_call

from time import time

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    call_price = None
    if request.method == 'POST':
        # get the numbers from the form
        #TODO: index form output option value with data inputted (S0,K,etc.)
        S0 = float(request.form['S0'])
        K = float(request.form['K'])
        T = int(request.form['T'])
        N = int(request.form['N'])
        r = float(request.form['r'])
        u = float(request.form['u'])
        call_price = round(binomial_call(S0=S0, K=K, T=T, N=N, r=r, u=u, d=1/u), 2) #currently default values in funciton
    return render_template('index.html', call_price=call_price)

if __name__ == '__main__':
    app.run(debug=True)