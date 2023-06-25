-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/CAtokJ
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "country" (
    -- Flag data per country
    "countryID" int   NOT NULL,
    "attribution" text   NOT NULL,
    "country" text   NOT NULL,
    "image" text   NOT NULL,
    CONSTRAINT "pk_country" PRIMARY KEY (
        "countryID"
     )
);

CREATE TABLE "cost" (
    -- Cost rankings per location
    "costID" int   NOT NULL,
    "locationID" int   NOT NULL,
    "totalRank" float   NOT NULL,
    CONSTRAINT "pk_cost" PRIMARY KEY (
        "costID"
     )
);

CREATE TABLE "location" (
    -- Metadata for each location
    "locationID" int   NOT NULL,
    "countryID" int   NOT NULL,
    "city" text   NOT NULL,
    "latitude" text   NOT NULL,
    "locality" text   NULL,
    "longitude" text   NOT NULL,
    CONSTRAINT "pk_location" PRIMARY KEY (
        "locationID"
     )
);

CREATE TABLE "locationActivity" (
    -- There will be up to 5 rows per locationID
    -- Links the locationID and the activityID
    "locationActivityID" int   NOT NULL,
    "activityID" int   NOT NULL,
    "locationID" int   NOT NULL,
    CONSTRAINT "pk_locationActivity" PRIMARY KEY (
        "locationActivityID"
     )
);

CREATE TABLE "activity" (
    -- Unique activity options with images
    "activityID" int   NOT NULL,
    "category" text   NOT NULL,
    "attribution" text   NOT NULL,
    "image" text   NOT NULL,
    "link" text   NOT NULL,
    CONSTRAINT "pk_activity" PRIMARY KEY (
        "activityID"
     )
);

CREATE TABLE "weather" (
    -- Weather data for each location
    "weatherID" int   NOT NULL,
    "locationID" int   NOT NULL,
    "monthID" int   NOT NULL,
    "year" int   NOT NULL,
    "sun" float   NOT NULL,
    "temp" float   NOT NULL,
    CONSTRAINT "pk_weather" PRIMARY KEY (
        "weatherID"
     )
);

CREATE TABLE "month" (
    -- Month ID to text
    "monthID" int   NOT NULL,
    "month" text   NOT NULL,
    CONSTRAINT "pk_month" PRIMARY KEY (
        "monthID"
     )
);

ALTER TABLE "cost" ADD CONSTRAINT "fk_cost_locationID" FOREIGN KEY("locationID")
REFERENCES "location" ("locationID");

ALTER TABLE "location" ADD CONSTRAINT "fk_location_countryID" FOREIGN KEY("countryID")
REFERENCES "country" ("countryID");

ALTER TABLE "locationActivity" ADD CONSTRAINT "fk_locationActivity_activityID" FOREIGN KEY("activityID")
REFERENCES "activity" ("activityID");

ALTER TABLE "locationActivity" ADD CONSTRAINT "fk_locationActivity_locationID" FOREIGN KEY("locationID")
REFERENCES "location" ("locationID");

ALTER TABLE "weather" ADD CONSTRAINT "fk_weather_locationID" FOREIGN KEY("locationID")
REFERENCES "location" ("locationID");

ALTER TABLE "weather" ADD CONSTRAINT "fk_weather_monthID" FOREIGN KEY("monthID")
REFERENCES "month" ("monthID");

