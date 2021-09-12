CREATE TABLE users (
user_id              VARCHAR(25) NOT NULL,
user_name	         VARCHAR(50) NOT NULL,
role                 VARCHAR(50) NOT NULL,
password             VARCHAR(255) NOT NULL,
email                VARCHAR(255) PRIMARY KEY,
status                 VARCHAR(50) ,
  CONSTRAINT "ChannelList_cohort_channel_unique" UNIQUE (email)
);