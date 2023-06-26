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


@app.route('/api/get_all')
@cross_origin()
def get_all():
    session = Session(engine)
    q = session.query(location).join(country).join(cost).all()
    allData = []
    for record in q:
        costs = session.query(cost).where(cost.locationID==record.locationID).all()
        activities = session.query(locationActivity).filter(locationActivity.locationID == record.locationID).join(activity,locationActivity.activityID==activity.activityID).limit(5).all()
        weathers = session.query(weather).filter(weather.locationID == record.locationID).join(month,weather.monthID==month.monthID).all()
        activity_list = []
        weather_list = []
        cost_list=[]

        # for c in costs:
        #     cost_data = {
        #         "costRank":c.totalRank
        #     }
        #     cost_list.append(cost_data)

        for a in activities:
            activity_data = {
                "activity" : a.activity.category,
                "image" : a.activity.image,
                "attribution":a.activity.attribution,
                "link":a.activity.link
            }
            activity_list.append(activity_data)
        for w in weathers:
            weather_data = {
                "month":w.month.month,
                "year":w.year,
                "sun":w.sun,
                "temp":w.temp
            }
            weather_list.append(weather_data)

        data = {
            "type":"Feature",
            "properties":{
                "ID":record.locationID,
                "name":{
                    "city":record.city,
                    "locality":record.locality,
                    "country":record.country.country,
                },
                # update weather variables to reflect newly gathered code above
                "weather":weather_list,
                # update activity variables to reflect newly gathered code above
                "activities":activity_list,
                "flag":{
                    "attribution":record.country.attribution,
                    "image":record.country.image + ".png"
                },
                "costRank":costs[0].totalRank
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