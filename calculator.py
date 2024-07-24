from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def your_python_function(input_data1, input_data2):
    # Replace with your function logic, for example, summing the inputs
    return {"result": input_data1 + input_data2}

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    input_value1 = data.get('input1')
    input_value2 = data.get('input2')
    result = your_python_function(input_value1, input_value2)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)