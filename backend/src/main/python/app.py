from Flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/echo')
def doecho():
    return jsonify(request.json)

if __name__ == "__main__":
    app.run(dubug=True, host='127.0.0.1',port=8888)