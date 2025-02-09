from sqlalchemy.dialects.postgresql import UUID
from flask_sqlalchemy import SQLAlchemy
import datetime
import uuid


db = SQLAlchemy()

class Quest(db.Model):
    __tablename__ = 'quest_model'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    amount_of_questions = db.Column(
        db.Integer,
        index=False,
        unique=False,
        nullable=False,
        default=0
    )
    description = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    name = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    rating = db.Column(
        db.Integer,
        index=False,
        unique=False,
        nullable=True,
        default=0
    )
    time_limit = db.Column(
        db.Integer,
        index=False,
        unique=False,
        nullable=True
    )
    owner_id = db.Column(
        UUID(as_uuid=True),
        index=False,
        unique=False,
        nullable=False
    )

    def __init__(self, name, description, time_limit, owner_id):
        self.name = name
        self.description = description
        self.time_limit = time_limit
        self.owner_id = owner_id

    def __repr__(self):
        return '<Quest %r>' % self.name
    
class User(db.Model):
    __tablename__ = 'user_model'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    avatar = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    created_quests_rating = db.Column(
        db.Integer,
        index=False,
        unique=False,
        nullable=False,
        default=0
    )
    email = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    password = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    profile_picture = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    user_name = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )

    def __init__(self, email, password, user_name):
        self.email = email
        self.password = password
        self.user_name = user_name
        self.created_quests_rating=0

    def __repr__(self):
        return '<User %r>' % self.user_name
    
class QuestTask(db.Model):
    __tablename__ = 'quest_task'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    photo_for_task = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    place_in_quest_queue = db.Column(
        db.Integer,
        index=False,
        unique=False,
        nullable=False,
        default=0
    )
    video_for_task = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    answer_variation1 = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    answer_variation2 = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    answer_variation3 = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    answer_variation4 = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    task_description = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )
    text_for_task = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )

    quest_id = db.Column(
        UUID(as_uuid=True),
        index=False,
        unique=False,
        nullable=False
    )

    def __init__(self, place_in_quest_queue, task_description, text_for_task,quest_id):
        self.place_in_quest_queue = place_in_quest_queue
        self.task_description = task_description
        self.text_for_task = text_for_task
        self.quest_id=quest_id

    def __repr__(self):
        return '<QuestTask %r>' % self.task_description


class UserComplitedQuests(db.Model):
    __tablename__ = 'user_completed_quests'

    quest_id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        unique=False,
        nullable=False
    )

    user_id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        unique=False,
        nullable=False
    )

    def __init__(self, quest_id, user_id):
        self.quest_id = quest_id
        self.user_id = user_id

class UserOngoingTasks(db.Model):
    __tablename__ = 'user_ongoing_tasks'

    quest_id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        unique=False,
        nullable=False
    )

    user_id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        unique=False,
        nullable=False
    )

    task_id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        unique=False,
        nullable=False
    )
    user_answer = db.Column(
        db.String(255),
        index=False,
        unique=False,
        nullable=True
    )

    def __init__(self, quest_id, user_id,task_id):
        self.quest_id = quest_id
        self.user_id = user_id
        self.task_id = task_id


class UserOngoingQuests(db.Model):
    __tablename__ = 'user_ongoing_quests'

    quest_id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        unique=False,
        nullable=False
    )

    user_id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        unique=False,
        nullable=False
    )

    starttime = db.Column(
        db.DateTime,
        index=False,
        unique=False,
        nullable=True,
        default=datetime.datetime.now
    )
    finishtime = db.Column(
        db.DateTime,
        index=False,
        unique=False,
        nullable=True
    )

    def __init__(self, quest_id, user_id):
        self.quest_id = quest_id
        self.user_id = user_id
        self.starttime=datetime.datetime.now

