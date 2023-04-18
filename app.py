# import Flask
import os
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

engine = create_engine(os.getenv('DATABASE_URI'))

Base = automap_base()

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
    activitySearch = session.query(Activities.LocationID, Activities.Activity1,Activities.Activity2,Activities.Activity3,Activities.Activity4,Activities.Activity5).all()
    activityResults = []
    for LocationID, Activity1, Activity2, Activity3, Activity4, Activity5 in activitySearch:
        act_dict = {}
        act_dict["locationID"] = LocationID
        act_dict["act1"] = Activity1
        act_dict["act2"] = Activity2
        act_dict["act3"] = Activity3
        act_dict["act4"] = Activity4
        act_dict["act5"] = Activity5
        activityResults.append(act_dict)
        
    # Activity List
    activityListSearch = session.query(ActivityList.ActivityID, ActivityList.Image, ActivityList.Attribution, ActivityList.Link).all()
    activityListResults = []
    for ActivityID, Image, Attribution, Link in activityListResults:
        actlist_dict = {}
        actlist_dict["activityID"] = ActivityID
        actlist_dict["image"] = Image
        actlist_dict["attribution"] = Attribution
        actlist_dict["link"] = Link
        activityListResults.append(actlist_dict)

    # Locations
    LocationSearch = session.query(Locations.LocationID,Locations.City,Locations.Locality,Locations.Country,Locations.Latitude,Locations.Longitude).all()
    locationResults = []
    for LocationID, City, Locality, Country, Latitude, Longitude in locationResults:
        location_dict = {}
        location_dict["locationID"] = LocationID
        location_dict["city"] = City
        location_dict["locality"] = Locality
        location_dict["country"] = Country
        location_dict["coords"] = {"Latitude": Latitude,"Longitude": Longitude}
        locationResults.append(location_dict)

    # Country Flags
    FlagSearch = session.query(CountryFlags.Country, CountryFlags.Image, CountryFlags.Attribution).all()
    FlagResults = []
    for Country, Image, Attribution in locationResults:
        flag_dict = {}
        flag_dict["country"] = Country
        flag_dict["image"] = Image
        flag_dict["attribution"] = Attribution
        FlagResults.append(flag_dict)

    # Sun Hours
    SunSearch = session.query(SunHours.LocationID,SunHours.January,SunHours.February,SunHours.March,SunHours.April,SunHours.May,SunHours.June,SunHours.July,SunHours.August,SunHours.September,SunHours.October,SunHours.November,SunHours.December).all()
    SunResults = []
    for LocationID, January, February, March, April, May, June, July, August, September, October, November, December in SunResults:
        sun_dict = {}
        sun_dict["locationID"] = LocationID
        sun_dict["Jan"] = January
        sun_dict["Feb"] = February
        sun_dict["Mar"] = March
        sun_dict["Apr"] = April
        sun_dict["May"] = May
        sun_dict["Jun"] = June
        sun_dict["Jul"] = July
        sun_dict["Aug"] = August
        sun_dict["Sep"] = September
        sun_dict["Oct"] = October
        sun_dict["Nov"] = November
        sun_dict["Dec"] = December
        SunResults.append(sun_dict)
    # Temperature
    TempSearch = session.query(Temperature.LocationID,Temperature.January,Temperature.February,Temperature.March,Temperature.April,Temperature.May,Temperature.June,Temperature.July,Temperature.August,Temperature.September,Temperature.October,Temperature.November,Temperature.December).all()
    TempResults = []
    for LocationID, January, February, March, April, May, June, July, August, September, October, November, December in TempResults:
        temp_dict = {}
        temp_dict["locationID"] = LocationID
        temp_dict["Jan"] = January
        temp_dict["Feb"] = February
        temp_dict["Mar"] = March
        temp_dict["Apr"] = April
        temp_dict["May"] = May
        temp_dict["Jun"] = June
        temp_dict["Jul"] = July
        temp_dict["Aug"] = August
        temp_dict["Sep"] = September
        temp_dict["Oct"] = October
        temp_dict["Nov"] = November
        temp_dict["Dec"] = December
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