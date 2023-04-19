-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/kYxNNB
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "locations" (
    "LocationID" int   NOT NULL,
    "City" varchar   NOT NULL,
    "Locality" varchar   NOT NULL,
    "Country" varchar   NOT NULL,
    "Latitude" float   NOT NULL,
    "Longitude" float   NOT NULL,
    CONSTRAINT "pk_locations" PRIMARY KEY (
        "LocationID"
     )
);

CREATE TABLE "countryFlags" (
    "Country" varchar   NOT NULL,
    "Image" text   NOT NULL,
    "Attribution" text   NOT NULL,
    CONSTRAINT "pk_countryFlags" PRIMARY KEY (
        "Country"
     )
);

CREATE TABLE "sunHours" (
    "LocationID" int   NOT NULL,
    "January" int   NOT NULL,
    "February" int   NOT NULL,
    "March" int   NOT NULL,
    "April" int   NOT NULL,
    "May" int   NOT NULL,
    "June" int   NOT NULL,
    "July" int   NOT NULL,
    "August" int   NOT NULL,
    "September" int   NOT NULL,
    "October" int   NOT NULL,
    "November" int   NOT NULL,
    "December" int   NOT NULL,
    CONSTRAINT "pk_sunHours" PRIMARY KEY (
        "LocationID"
     )
);

CREATE TABLE "temperature" (
    "LocationID" int   NOT NULL,
    "January" int   NOT NULL,
    "February" int   NOT NULL,
    "March" int   NOT NULL,
    "April" int   NOT NULL,
    "May" int   NOT NULL,
    "June" int   NOT NULL,
    "July" int   NOT NULL,
    "August" int   NOT NULL,
    "September" int   NOT NULL,
    "October" int   NOT NULL,
    "November" int   NOT NULL,
    "December" int   NOT NULL,
    CONSTRAINT "pk_temperature" PRIMARY KEY (
        "LocationID"
     )
);

CREATE TABLE "costAnalysis" (
    "LocationID" int   NOT NULL,
    "total_rank" float   NOT NULL,
    CONSTRAINT "pk_costAnalysis" PRIMARY KEY (
        "LocationID"
     )
);

CREATE TABLE "activityList" (
    "ActivityID" varchar   NOT NULL,
    "Image" text   NOT NULL,
    "Attribution" text   NOT NULL,
    "Link" varchar   NOT NULL,
    CONSTRAINT "pk_activityList" PRIMARY KEY (
        "ActivityID"
     )
);

CREATE TABLE "activities" (
    "LocationID" int   NOT NULL,
    "Activity1" varchar   NOT NULL,
    "Activity2" varchar   NOT NULL,
    "Activity3" varchar   NOT NULL,
    "Activity4" varchar   NOT NULL,
    "Activity5" varchar   NOT NULL,
    CONSTRAINT "pk_activities" PRIMARY KEY (
        "LocationID","Activity1","Activity2","Activity3","Activity4","Activity5"
     )
);

CREATE TABLE "fullactivities" (
    "LocationID" int   NOT NULL,
    "activity" varchar   NOT NULL,
    "image" varchar   NOT NULL,
    "attribution" varchar   NOT NULL,
    "link" varchar   NOT NULL,
    "primary_key" int   NOT NULL,
    CONSTRAINT "pk_fullactivities" PRIMARY KEY (
        "primary_key"
     )
);

ALTER TABLE "locations" ADD CONSTRAINT "fk_locations_Country" FOREIGN KEY("Country")
REFERENCES "countryFlags" ("Country");

ALTER TABLE "sunHours" ADD CONSTRAINT "fk_sunHours_LocationID" FOREIGN KEY("LocationID")
REFERENCES "locations" ("LocationID");

ALTER TABLE "temperature" ADD CONSTRAINT "fk_temperature_LocationID" FOREIGN KEY("LocationID")
REFERENCES "locations" ("LocationID");

ALTER TABLE "costAnalysis" ADD CONSTRAINT "fk_costAnalysis_LocationID" FOREIGN KEY("LocationID")
REFERENCES "locations" ("LocationID");

ALTER TABLE "activities" ADD CONSTRAINT "fk_activities_LocationID" FOREIGN KEY("LocationID")
REFERENCES "locations" ("LocationID");

ALTER TABLE "activities" ADD CONSTRAINT "fk_activities_Activity1" FOREIGN KEY("Activity1")
REFERENCES "activityList" ("ActivityID");

ALTER TABLE "activities" ADD CONSTRAINT "fk_activities_Activity2" FOREIGN KEY("Activity2")
REFERENCES "activityList" ("ActivityID");

ALTER TABLE "activities" ADD CONSTRAINT "fk_activities_Activity3" FOREIGN KEY("Activity3")
REFERENCES "activityList" ("ActivityID");

ALTER TABLE "activities" ADD CONSTRAINT "fk_activities_Activity4" FOREIGN KEY("Activity4")
REFERENCES "activityList" ("ActivityID");

ALTER TABLE "activities" ADD CONSTRAINT "fk_activities_Activity5" FOREIGN KEY("Activity5")
REFERENCES "activityList" ("ActivityID");

ALTER TABLE "fullactivities" ADD CONSTRAINT "fk_fullactivities_LocationID" FOREIGN KEY("LocationID")
REFERENCES "locations" ("LocationID");

ALTER TABLE "fullactivities" ADD CONSTRAINT "fk_fullactivities_activity_image_attribution_link" FOREIGN KEY("activity", "image", "attribution", "link")
REFERENCES "activityList" ("ActivityID", "Image", "Attribution", "Link");

CREATE INDEX "idx_locations_City"
ON "locations" ("City");

