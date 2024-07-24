from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow only the React frontend origin

def add(input1, input2):
    return {"result": int(input1) + int(input2)}

def multiply(input1, input2):
    return {"result": int(input1) * int(input2)}

@app.route('/api/add', methods=['POST'])
def calculate_add():
    data = request.get_json()
    input1 = data.get('input1')
    input2 = data.get('input2')
    result = add(input1, input2)
    return jsonify(result)

@app.route('/api/multiply', methods=['POST'])
def calculate_multiply():
    data = request.get_json()
    input1 = data.get('input1')
    input2 = data.get('input2')
    result = multiply(input1, input2)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)