# import Flask
import os
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

Base = automap_base()

engine = create_engine(os.getenv('DATABASE_URI'))

Base.prepare(engine,reflect=True)

# Save table references
Activities = Base.classes.activities
CountryFlags = Base.classes.countryFlags
Locations = Base.classes.locations
SunHours = Base.classes.sunHours
Temperature = Base.classes.temperature
ActivityList = Base.classes.activityList

# Bind Session
session = Session(engine)

#create engine 
app = Flask(__name__)

# #test
@app.route('/')
def index():
    return 'Hello, World!! The Honeymooners have arrived!!'

@app.route('/api/get_all')
def getdata():
    return jsonify(**CountryFlags**ActivityList)