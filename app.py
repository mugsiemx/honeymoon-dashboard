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
cost = Base.classes.cost
country = Base.classes.country
location = Base.classes.location
locationActivity = Base.classes.locationActivity
activity = Base.classes.activity
weather = Base.classes.weather
month = Base.classes.month

#create engine 
app = Flask(__name__)

#test
@app.route('/')
@cross_origin()
def welcome():
    return 'Welcome to our API!! Use /api/get_all to get all JSON data'

@app.route('/api/locations')
@cross_origin()
def locations():
    locations = location.query.all()
    return jsonify({"data":[{
        "locationID":locations.locationID,
        "countryID":locations.countryID,
        "city":locations.city,
        "locality":locations.locality,
        "coordinates":{"longitude":locations.longitude,"latitude":locations.latitude}
    } for location in locations]})

# @app.route('/api/countries')
# @cross_origin()
# def countries():
#     countries = country.query.all()
#     return jsonify({"data":[{
#         "countryID":country.countryID,
#         "country":country.country,
#         "image":country.image,
#         "attribution":country.attribution
#     }for country in countries]})



@app.route('/api/get_all')
@cross_origin()
def get_all():
    session = Session(engine)
    q = session.query(location).join(country).join(cost).join(weather).join(month).join(locationActivity).join(activity).all()
    allData = []
    for record in q:
        ## add code here to query the top 5 activities and the weather averages for each month
        #################################################################


        data = {
            "type":"Feature",
            "properties":{
                "ID":record.locationID,
                "name":{
                    "city":record.city,
                    "locality":record.locality,
                    "country":record.country.country,
                },
                ########### update weather variables to reflect newly gathered code above
                "weather":{
                    "month":record.month,
                    "year":record.year,
                    "sun":record.sun,
                    "temp":record.temp
                },
                ########### update activity variables to reflect newly gathered code above
                "activities":{
                    "activityID":record.activityID,
                    "image":record.activity.image,
                    "attribution":record.activity.attribution,
                    "link":record.activity.link
                },
                "flag":{
                    "attribution":record.country.attribution,
                    "image":record.country.image
                },
                "costRank":record.totalRank
                },
            "geometry":{
                "type":"Point",
                "coordinates":[record.longitude,record.latitude]
            }
        }
        allData.append(data)
    jsonData = {"type":"FeatureCollection","features":allData}
    return jsonify(jsonData)


if __name__ == "__main__":
    app.run(debug=True)