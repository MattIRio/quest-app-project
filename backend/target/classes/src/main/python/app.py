from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/echo', methods = ['GET', 'POST'])
def doecho():
    return jsonify(request.json)

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1',port=6060)