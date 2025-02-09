
import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from models import Quest,db, UserComplitedQuests


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'webm', 'flv', 'avi', 'mov', 'wmv', 'mp4'}

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@quest_db:5432/Quest_Project_DB'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db.init_app(app)

@app.route('/echo', methods = ['GET', 'POST'])
def doecho():
    return jsonify(request.json)

@app.route('/quests', methods = ['GET'])
def queryquests():
    page = 0
    if request.args.get('page', default='0').isnumeric():
        page = int(request.args.get('page', default='0'))
    sort = request.args.get('sort', default='rating')
    result = []
    match sort:
        case 'rating':
            result = Quest.query.order_by(Quest.rating.desc()).slice(page*10,page*10+10).all()
        case 'name':
            result = Quest.query.order_by(Quest.name).slice(page*10,page*10+10).all()
    return jsonify(result)

@app.route('/ratequests', methods = ['PUT'])
def ratequests():
    grade = 0
    if request.args.get('grade', default='0').isnumeric():
        grade = int(request.args.get('grade', default='0'))
    quest_id = (request.args.get('quest_id', default = ''))
    cnt = UserComplitedQuests.query.filter_by(quest_id=quest_id).count()
    quest=Quest.query.get_or_404(quest_id)
    newrating=grade
    if cnt > 1:
       newrating=(quest.rating*(cnt-1)+grade)//cnt
    quest.rating = newrating
    db.session.add(quest)
    db.session.commit()
    return jsonify(quest)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/videoupload', methods=['POST'])
def upload_file():
        if 'file' not in request.files:
            return 'Forbidden', 403
        file = request.files['file']
        path=""

        if file.filename == '':
            return "NotFound", 404
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            path=os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(path)
        return jsonify(path)

import questuserflow

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")


