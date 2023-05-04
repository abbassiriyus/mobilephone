
CREATE TABLE "facebook"(
"facebookid" SERIAL PRIMARY KEY,
"email" VARCHAR(50) NOT NULL ,
"parol"  VARCHAR(50) NOT NULL,
"syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
"syschangedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);

CREATE TABLE "google"(
"googleid" SERIAL PRIMARY KEY,
"email" VARCHAR(50) NOT NULL ,
"parol"  VARCHAR(50) NOT NULL,
"syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
"syschangedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);
CREATE TABLE "apple"(
"appleid" SERIAL PRIMARY KEY,
"email" VARCHAR(50) NOT NULL ,
"parol"  VARCHAR(50) NOT NULL,
"syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
"syschangedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);
CREATE TABLE "person" (
"personid" SERIAL PRIMARY KEY,
"email" VARCHAR(50) NOT NULL,
"fullname" VARCHAR(50) NOT NULL,
"phone" VARCHAR(50) NOT NULL,
"facebookid" INTEGER,
"googleid" INTEGER,
"appleid" INTEGER,
"syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
"syschangedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
 FOREIGN KEY (facebookid) REFERENCES facebook(facebookid),
 FOREIGN KEY (googleid) REFERENCES google(googleid),
 FOREIGN KEY (appleid) REFERENCES apple(appleid)
);

CREATE TABLE "oldmessage"(
"messageid" SERIAL PRIMARY KEY,
"personid" INTEGER NOT NULL,
"message" TEXT NOT NULL ,
FOREIGN KEY (personid) REFERENCES "person"(personid),
"syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
"syschangedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
)

CREATE TABLE "katalog"(
"katalogid" SERIAL PRIMARY KEY,
"katalog_name"  VARCHAR(50) NOT NULL,
"katalog_img" TEXT,
"syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
"syschangedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
)
CREATE TABLE "personkatalog"(
"person_katalog_id" SERIAL PRIMARY KEY,
"katalogid"  INTEGER NOT NULL,
"personid"  INTEGER NOT NULL,
"syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
"syschangedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
 FOREIGN KEY (personid) REFERENCES "person"(personid),
  FOREIGN KEY (katalogid) REFERENCES katalog(katalogid)
)
