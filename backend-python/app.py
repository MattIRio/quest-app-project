from flask import Flask, request, jsonify
from models import Quest,db


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@quest_db:5432/Quest_Project_DB'

db.init_app(app)

@app.route('/echo', methods = ['GET', 'POST'])
def doecho():
    return jsonify(request.json)

@app.route('/quests', methods = ['GET'])
def queryquests():
    page = int(request.args.get('page'))
    sort = request.args.get('sort')
    result = []
    match sort:
        case 'rating':
            result = Quest.query.order_by(Quest.rating.desc()).slice(page*10,page*10+10).all()
        case 'name':
            result = Quest.query.order_by(Quest.name).slice(page*10,page*10+10).all()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1',port=6060)