# Import framework
from flask import Flask, render_template, jsonify

# SQL management
import os
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

# Login 
from flask_login import LoginManager
login_manager = LoginManager()
from flask_wtf import FlaskForm

from wtforms import StringField, PasswordField, SubmitField


class LoginForm(FlaskForm):
    username = StringField('Username')
    password = PasswordField('Password')
    submit = SubmitField('Submit')


# SQL serialising
from flask_marshmallow import Marshmallow 
import json

# Security stuff
import secrets

# Attempt to start MySQL via console 
os.system("mysql.server start")

# Create the application object
app = Flask(__name__)

# Generate secure key for session
secret_key = secrets.token_hex()
app.config['SECRET_KEY'] = secret_key

# Configure SQLAlchemy options
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/classroom_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
login_manager.init_app(app)

# Create database model
class Classroom(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String(50), nullable=False)
    room_description = db.Column(db.String(280), nullable=True)
    latitude = db.Column(db.DECIMAL(8, 6), nullable=False)
    longitude = db.Column(db.DECIMAL(9, 6), nullable=False)


class ClassroomSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Classroom
        load_instance = True

# Initialise admin panel
admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
admin.add_view(ModelView(Classroom, db.session))


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)
"""
class MicroBlogModelView(sqla.ModelView):

    def is_accessible(self):
        return login.current_user.is_authenticated

    def inaccessible_callback(self, name, **kwargs):
        # redirect to login page if user doesn't have access
        return redirect(url_for('login', next=request.url))
        """

@app.route('/getpythondata')
def get_python_data():
    classrooms = Classroom.query.all()
    classroom_schema = ClassroomSchema(many=True)
    output = classroom_schema.dump(classrooms)
    return jsonify({'classroom' : output})

# Pages
@app.route('/')
def home():
    return render_template('index.j2') 

@app.route('/guide.html')
def guide():
    return render_template('guide.j2') 

@app.route('/about.html')
def about():
    return render_template('about.j2') 

@app.route('/licensing.html')
def licensing():
    return render_template('licensing.j2') 

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Here we use a class of some kind to represent and validate our
    # client-side form data. For example, WTForms is a library that will
    # handle this for us, and we use a custom LoginForm to validate.
    form = LoginForm()
    if form.validate_on_submit():
        # Login and validate the user.
        # user should be an instance of your `User` class
        login_user(user)

        flask.flash('Logged in successfully.')

        next = flask.request.args.get('next')
        # is_safe_url should check if the url is safe for redirects.
        # See http://flask.pocoo.org/snippets/62/ for an example.
        if not is_safe_url(next):
            return flask.abort(400)

        return redirect(next or flask.url_for('index'))
    return render_template('login.j2', form=form)

@app.errorhandler(404)
def page_not_found(e):
    # Note that we set the 404 status explicitly
    return render_template('404.j2'), 404

# Start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)
    

