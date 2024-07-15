from flask import Flask, render_template, request, jsonify
from models.binomial_european import binomial_slow

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    result = None
    if request.method == 'POST':
        # get the numbers from the form 
        result = float(binomial_slow()) # currently default values in funciton
    return render_template('index.html', result=result)

@app.route('/hello')
def hello():
    return render_template('hello.html')

if __name__ == '__main__':
    app.run(debug=True)