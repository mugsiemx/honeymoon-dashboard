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

#create engine 
app = Flask(__name__)


# Bind Session


# #test
@app.route('/')
def welcome():
    return 'Welcome to our API!! Use /api/get_all to get all JSON data'

@app.route('/api/get_all')
def getdata():
    session = Session(engine)
    # Activities
    activitySearch = session.query(Activities).all()
    activityResults = []
    for location,act1,act2,act3,act4,act5 in activitySearch:
        act_dict = {}
        act_dict["location"] = location
        act_dict["act1"] = act1
        act_dict["act2"] = act2
        act_dict["act3"] = act3
        act_dict["act4"] = act4
        act_dict["act5"] = act5
        activityResults.append(act_dict)
    # Activity List
    activityListSearch = session.query(ActivityList).all()
    activityListResults = []
    for ActivityID, Image, Attribution, Link in activityListResults:
        actlist_dict = {}
        actlist_dict["activityID"] = ActivityID
        actlist_dict["image"] = Image
        actlist_dict["attribution"] = Attribution
        actlist_dict["link"] = Link
        activityListResults.append(actlist_dict)
    # Locations
    LocationSearch = session.query(Locations).all()
    locationResults = []
    for locationID, City, Locality, Country, Latitude, Longitude in locationResults:
        location_dict = {}
        location_dict["locationID"] = locationID
        location_dict["city"] = City
        location_dict["locality"] = Locality
        location_dict["country"] = Country
        location_dict["coords"] = {"Latitude": Latitude,"Longitude": Longitude}
        locationResults.append(location_dict)
    # Country Flags
    FlagSearch = session.query(CountryFlags).all()
    FlagResults = []
    for Country, Image, Attribution in locationResults:
        flag_dict = {}
        flag_dict["country"] = Country
        flag_dict["image"] = Image
        flag_dict["attribution"] = Attribution
        flagResults.append(flag_dict)
    # Sun Hours
    SunSearch = session.query(SunHours).all()
    SunResults = []
    for locationID,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec in SunResults:
        sun_dict = {}
        sun_dict["locationID"] = locationID
        sun_dict["Jan"] = Jan
        sun_dict["Feb"] = Feb
        sun_dict["Mar"] = Mar
        sun_dict["Apr"] = Apr
        sun_dict["May"] = May
        sun_dict["Jun"] = Jun
        sun_dict["Jul"] = Jul
        sun_dict["Aug"] = Aug
        sun_dict["Sep"] = Sep
        sun_dict["Oct"] = Oct
        sun_dict["Nov"] = Nov
        sun_dict["Dec"] = Dec
        SunResults.append(sun_dict)
    # Temperature
    TempSearch = session.query(Temperature).all()
    TempResults = []
    for locationID,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec in TempResults:
        temp_dict = {}
        temp_dict["locationID"] = locationID
        temp_dict["Jan"] = Jan
        temp_dict["Feb"] = Feb
        temp_dict["Mar"] = Mar
        temp_dict["Apr"] = Apr
        temp_dict["May"] = May
        temp_dict["Jun"] = Jun
        temp_dict["Jul"] = Jul
        temp_dict["Aug"] = Aug
        temp_dict["Sep"] = Sep
        temp_dict["Oct"] = Oct
        temp_dict["Nov"] = Nov
        temp_dict["Dec"] = Dec
        TempResults.append(temp_dict)
    session.close()
    allData = {"Activities": activityResults,
            "ActivityList" :activityListResults,
            "Locations": locationResults,
            "CountryFlags": FlagResults,
            "SunDays" : SunResults,
            "AvgTemp" : TempResults
            }
    return jsonify(allData)

if __name__ == "__main__":
    app.run(debug=True)