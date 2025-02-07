from sqlalchemy.dialects.postgresql import UUID
from flask_sqlalchemy import SQLAlchemy
import uuid


db = SQLAlchemy()

class Quest(db.Model):
    __tablename__ = 'quest_task'

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