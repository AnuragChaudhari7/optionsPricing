from flask import Flask, render_template, request, jsonify
from models.binomial_european import binomial_slow

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    result = None
    if request.method == 'POST':
        # get the numbers from the form
        #TODO: index form output option value with data inputted (S0,K,etc.)
        S0 = float(request.form['S0'])

        result = float(binomial_slow(S0=S0)) # currently default values in funciton
    return render_template('index.html', result=result)

@app.route('/hello')
def hello():
    return render_template('hello.html')

if __name__ == '__main__':
    app.run(debug=True)