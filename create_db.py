# import the Flask class from the flask module
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

# create the application object
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/classroom_db'

db = SQLAlchemy(app)

# Create database model
class classrooms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.Integer, nullable=False)
    latitude = db.Column(db.DECIMAL(8, 6))
    longitude = db.Column(db.DECIMAL(9, 6))

    def __repr__(self):
        return '<User %r>' % self.room_number