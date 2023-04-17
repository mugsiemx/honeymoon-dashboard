# import Flask
import os
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

Base = automap_base()

engine = create_engine(os.getenv('DATABASE_URI'))

Base.prepare(engine,reflect=True)

# Add X = Base.classes.x where x is the table name in SQL


# Bind Session
session = Session(engine)

#create engine 
app = Flask(__name__)

# #test
@app.route('/')
def index():
    return 'Hello, World!! The Honeymooners have arrived!!'


#return
# @app.route('/')
# def index():
    #### insert the data being queried. See example:
##     cols = ['id', 'val']
##     data = session.query(Test).all()
##     result = [{col: getattr(d, col) for col in cols} for d in data]
##     return jsonify(result=result)

#     return "Honeymoon Dashboard" ## Change this to return a jsonified result

# if __name__ == '__main__':
# #     app.run(debug=True)
#     app:app