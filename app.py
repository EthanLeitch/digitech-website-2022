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


# use decorators to link the function to a url
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

@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template('404.j2'), 404

# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)
    

