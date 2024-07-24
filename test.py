from flask import Flask, request, jsonify

app = Flask(__name__)

def your_python_function(input_data):
    # Replace with your function logic
    return {"result": input_data * 2}

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    input_value = data.get('input')
    result = your_python_function(input_value)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)