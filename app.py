# import the Flask class from the flask module
from flask import Flask, render_template

# create the application object
app = Flask(__name__)

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
    

