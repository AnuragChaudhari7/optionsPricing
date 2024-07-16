from flask import Flask, render_template, request, jsonify
from models.binomial_european import binomial_fast

from time import time

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    result = None
    t = 0
    if request.method == 'POST':
        # get the numbers from the form
        #TODO: index form output option value with data inputted (S0,K,etc.)
        S0 = float(request.form['S0'])
        K = float(request.form['K'])
        T = float(request.form['T'])
        N = int(request.form['N'])
        r = float(request.form['r'])
        u = float(request.form['u'])
        result = round(float(binomial_fast(S0=S0, K=K, T=T, N=N, r=r, u=u)), 2) #currently default values in funciton
    return render_template('index.html', result=result)

@app.route('/hello')
def hello():
    return render_template('hello.html')

if __name__ == '__main__':
    app.run(debug=True)