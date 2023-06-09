CREATE TABLE fullactivities AS (
SELECT "LocationID", "Activity1" as activity
FROM activities
UNION
SELECT "LocationID", "Activity2" as "activity"
FROM activities
UNION
SELECT "LocationID", "Activity3" as "activity"
FROM activities
UNION
SELECT "LocationID", "Activity4" as "activity"
FROM activities
UNION
SELECT "LocationID", "Activity5" as "activity"
FROM activities
);

ALTER TABLE fullactivities
ADD COLUMN image VARCHAR,
ADD COLUMN attribution VARCHAR,
ADD COLUMN link VARCHAR;

UPDATE fullactivities as a
SET "image" = b."Image"
FROM "activityList" as b
WHERE a.activity = b."ActivityID";

UPDATE fullactivities as a
SET "attribution" = b."Attribution"
FROM "activityList" as b
WHERE a.activity = b."ActivityID";

UPDATE fullactivities as a
SET "link" = b."Link"
FROM "activityList" as b
WHERE a.activity = b."ActivityID"

DELETE FROM fullactivities
WHERE image is null;
