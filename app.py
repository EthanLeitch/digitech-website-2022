# Import framework
from requests import request, session
from flask import Flask, render_template, jsonify, session, redirect, abort, request

# SQL management
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

# SQL serialising
from flask_marshmallow import Marshmallow 

# Security stuff
import secrets
from passlib.hash import bcrypt
from flask_wtf.csrf import CSRFProtect

# Ratelimiting 
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Setup bcrypt hasher
hasher = bcrypt.using(rounds=14) # Make bcrypt take longer (more secure)

# Load .env values
from dotenv import dotenv_values
config = dotenv_values(".env")

# Error checking
if not all(key in config.keys() for key in ("MYSQL_USERNAME", "MYSQL_PASSWORD", "WEBAPP_USERNAME", "WEBAPP_PASSWORD")): 
    print("env values not found. Remember to run setup.py")
    exit()

# Create the application object
csrf = CSRFProtect()
app = Flask(__name__)

# Enable ratelimiting
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

csrf.init_app(app)

# Generate secure key for session
secret_key = secrets.token_hex()
app.config['SECRET_KEY'] = secret_key

# Configure SQLAlchemy options
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{config["MYSQL_USERNAME"]}:{config["MYSQL_PASSWORD"]}@localhost/classroom_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Check MySQL server is running by sending a select request
db.engine.execute('SELECT 1')

# Create database model
class Classroom(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String(50), nullable=False)
    room_description = db.Column(db.String(280), nullable=True)
    latitude = db.Column(db.DECIMAL(8, 6), nullable=False)
    longitude = db.Column(db.DECIMAL(9, 6), nullable=False)

# This class is for serializing classroom_db to json 
class ClassroomSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Classroom
        load_instance = True

# Create SecureModelView 
class SecureModelView(ModelView):
    def is_accessible(self):
        if "logged_in" in session:
            return True
        else:
            # Return 401 Unauthorised as session is not authenticated
            abort(401)

# Initialise admin panel
admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
admin.add_view(SecureModelView(Classroom, db.session))

# Creates a page to serve database as json. This is then read by the map.js file.
@app.route('/getpythondata')
def get_python_data():
    classrooms = Classroom.query.all()
    classroom_schema = ClassroomSchema(many=True)
    output = classroom_schema.dump(classrooms)
    return jsonify({'classroom' : output})

# Use more secure HTTP headers
@app.after_request
def apply_caching(response):
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["HTTP-HEADER"] = "VALUE"
    return response

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
@limiter.limit("5 per minute")
def login():
    # Redirect to admin panel if already logged in 
    if session.get('logged_in'): 
        return redirect("/admin")
    
    if request.method == "POST":
        # Verify username by checking against config and verify password with bcrypt
        if request.form.get("username") == config["WEBAPP_USERNAME"] and hasher.verify(request.form.get("password"), config["WEBAPP_PASSWORD"]):
            # Correct username and password, redirect to admin panel
            session['logged_in'] = True
            return redirect("/admin")
        else:
            # Incorrect username or password
            return render_template("login.j2", failed=True)
    
    return render_template("login.j2")

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

# Error handling
@app.errorhandler(400)
def bad_request(e):
    return render_template("errors/400.j2"), 400

@app.errorhandler(401)
def unauthorized(e):
    # Do not return 401 error as it prevents redirecting
    return redirect("/login")

@app.errorhandler(404)
def page_not_found(e):
    return render_template("errors/404.j2"), 404

@app.errorhandler(429)
def too_many_requests(e):
    return render_template("errors/429.j2"), 429

@app.errorhandler(500)
def server_error(e):
    return render_template("errors/500.j2"), 500

# Start the server with the 'run()' method
if __name__ == '__main__':
    app.run()
    

