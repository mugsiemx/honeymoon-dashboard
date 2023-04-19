# import Flask
import os
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import MetaData
from sqlalchemy.ext.automap import automap_base
from flask_cors import cross_origin

engine = create_engine(os.getenv('DATABASE_URI'),pool_size=10,max_overflow=-1)
# meta = MetaData()
# MetaData.reflect(meta,bind=engine)
# meta.create_all(engine)


Base = automap_base()

Base.prepare(engine,reflect=True)
print(Base.classes.keys())

# Save table references
Activities = Base.classes.fullactivities
CountryFlags = Base.classes.countryFlags
Locations = Base.classes.locations
SunDays = Base.classes.sunHours
Temperature = Base.classes.temperature

#create engine 
app = Flask(__name__)

# #test
@app.route('/')
@cross_origin()
def welcome():
    return 'Welcome to our API!! Use /api/get_all to get all JSON data'

@app.route('/api/get_all')
@cross_origin()
def getdata():    
    session = Session(engine)
    locationIDsearch = session.query(Locations.LocationID).all()
    locationIDs = []
    # Create list of IDs
    for LocationID in locationIDsearch:
        locationIDs.append(LocationID[0])
    print(locationIDs)
    # Iterate through list of IDs to gather info for individual locations
    allData = []
    for ID in locationIDs:
        locationInfo = session.query(Locations).filter_by(LocationID = ID).all()
        for record in locationInfo:
            city = record.City
            country = record.Country
            locality = record.Locality
            coordinates = [record.Latitude,record.Longitude]
        activityInfo = session.query(Activities).filter_by(LocationID = ID).all()
        activity_list = []
        for record in activityInfo:
            activity=record.activity
            image=record.image
            attribution=record.attribution
            link=record.link
            activity_dict = { "name":activity,
                             "image":image,
                             "attribution":attribution,
                             "link":link
                            }
            activity_list.append(activity_dict)
        tempInfo = session.query(Temperature).filter_by(LocationID=ID).all()
        for record in tempInfo:
            JanTemp = record.January
            FebTemp = record.February
            MarTemp = record.March
            AprTemp = record.April
            MayTemp = record.May
            JunTemp = record.June
            JulTemp = record.July
            AugTemp = record.August
            SepTemp = record.September
            OctTemp = record.October
            NovTemp = record.November
            DecTemp = record.December
        sunInfo = session.query(SunDays).filter_by(LocationID=ID).all()
        for record in sunInfo:
            JanSun = record.January
            FebSun = record.February
            MarSun = record.March
            AprSun = record.April
            MaySun = record.May
            JunSun = record.June
            JulSun = record.July
            AugSun = record.August
            SepSun = record.September
            OctSun = record.October
            NovSun = record.November
            DecSun = record.December
        flagInfo = session.query(CountryFlags).filter_by(Country=country).all()
        for record in flagInfo:
            countryAttribution = record.Attribution
            countryImage = record.Image
        idData = {"type":"Feature",
                  "properties": {
                        "ID":ID,
                        "name": {
                            "city": city,
                            "locality": locality,
                            "country" : country
                        },
                        "avgTemp":{
                            "January":JanTemp,
                            "February":FebTemp,
                            "March":MarTemp,
                            "April":AprTemp,
                            "May":MayTemp,
                            "June":JunTemp,
                            "July":JulTemp,
                            "August":AugTemp,
                            "September":SepTemp,
                            "October":OctTemp,
                            "November":NovTemp,
                            "December":DecTemp
                        },
                        "sunDays":{
                            "January":JanSun,
                            "February":FebSun,
                            "March":MarSun,
                            "April":AprSun,
                            "May":MaySun,
                            "June":JunSun,
                            "July":JulSun,
                            "August":AugSun,
                            "September":SepSun,
                            "October":OctSun,
                            "November":NovSun,
                            "December":DecSun
                        },
                        "activities":[
                          activity_list],
                        "flag":{
                            "attribution":countryAttribution,
                            "image":countryImage
                        }
                        },
                  "geometry": {
                        "type":"Point",
                        "coordinates":coordinates
                        }
                }
        allData.append(idData)
    jsonData = {"type":"FeatureCollection","features":allData}
    return jsonify(jsonData)


if __name__ == "__main__":
    app.run(debug=True)