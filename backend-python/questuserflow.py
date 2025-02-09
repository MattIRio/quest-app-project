from app import app
import datetime
from flask import request, jsonify
from models import Quest,db, UserComplitedQuests,UserOngoingQuests,UserOngoingTasks,User,QuestTask
from sqlalchemy import delete


@app.route('/start_quest', methods = ['POST'])
def StartQuest():
    quest_id = (request.args.get('quest_id', default = ''))
    user_id = (request.args.get('user_id', default = ''))

    if quest_id=="" or user_id =="":
        return "NotFound", 404
    
    quest=Quest.query.get_or_404(quest_id)
    user=User.query.get_or_404(quest_id)
    
    queststatred=UserOngoingQuests(quest_id,user_id)
    db.session.add(queststatred)
    db.session.commit()
    return jsonify(queststatred)

@app.route('/start_task', methods = ['POST'])
def StartQuestTask():
    quest_id = (request.args.get('quest_id', default = ''))
    user_id = (request.args.get('user_id', default = ''))
    task_id = (request.args.get('task_id', default = ''))

    if quest_id=="" or user_id =="" or task_id =="":
        return "NotFound", 404
    
    quest=Quest.query.get_or_404(quest_id)
    user=User.query.get_or_404(quest_id)
    task=QuestTask.query.get_or_404(quest_id)
    
    ongoingquest=UserOngoingQuests.query.filter(UserOngoingQuests.quest_id==quest_id,UserOngoingQuests.user_id==user_id).first_or_404()

    timeleft=quest.time_limit - (datetime.datetime.now-ongoingquest.starttime).total_seconds()

    if timeleft<=0:
        QuestComplete(quest_id,user_id)
        return 'Forbidden', 403
    
    taskstatred=UserOngoingTasks(quest_id,user_id,task_id)
    db.session.add(taskstatred)
    db.session.commit()
    return jsonify(taskstatred)

@app.route('/complete_task', methods = ['PUT'])
def CompleteQuestTask():
    quest_id = (request.args.get('quest_id', default = ''))
    user_id = (request.args.get('user_id', default = ''))
    task_id = (request.args.get('task_id', default = ''))
    answer = (request.args.get('answer', default = ''))

    if quest_id=="" or user_id =="" or task_id =="":
        return "NotFound", 404
    
    quest=Quest.query.get_or_404(quest_id)
    user=User.query.get_or_404(quest_id)
    task=QuestTask.query.get_or_404(quest_id)
    
    ongoingquest=UserOngoingQuests.query.filter(UserOngoingQuests.quest_id==quest_id,UserOngoingQuests.user_id==user_id).first_or_404()
    ongoingtask=UserOngoingTasks.query.filter(UserOngoingTasks.quest_id==quest_id,UserOngoingTasks.user_id==user_id,UserOngoingTasks.task_id==task_id).first_or_404()


    timeleft=quest.time_limit - (datetime.datetime.now-ongoingquest.starttime).total_seconds()

    if timeleft<=0:
        QuestComplete(quest_id,user_id)
        return 'Forbidden', 403    

    if ongoingtask.user_answer != "":
        return 'Forbidden', 403    
    
    
    ongoingtask.user_answer=answer
    db.session.add(ongoingtask)
    db.session.commit()

    cntGoTasks = UserOngoingTasks.query.filter(UserOngoingTasks.quest_id==quest_id,UserOngoingTasks.user_id==user_id).count()
    cntAllTasks=QuestTask.query.filter(QuestTask.quest_id==quest_id).count()
    if cntGoTasks>=cntAllTasks:
        QuestComplete(quest_id,user_id)
    return jsonify(ongoingtask)


def QuestComplete(quest_id,user_id): 
    completedquest=UserComplitedQuests(quest_id,user_id)
    db.session.add(completedquest)
    db.session.commit()

    delete_query=UserOngoingTasks.delete().where(UserOngoingTasks.quest_id==quest_id,UserOngoingTasks.user_id==user_id)
    db.session.execute(delete_query)
    db.session.commit()

    delete_query=UserOngoingQuests.delete().where(UserOngoingQuests.quest_id==quest_id,UserOngoingQuests.user_id==user_id)
    db.session.execute(delete_query)
    db.session.commit()