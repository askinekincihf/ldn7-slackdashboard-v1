CREATE TABLE ChannelList (
  id             SERIAL PRIMARY KEY,
  cohort_id	     VARCHAR(30) NOT NULL,
  channel_id     VARCHAR(30) NOT NULL,
  channel_name   VARCHAR(30) NOT NULL,
  CONSTRAINT "ChannelList_cohort_channel_unique" UNIQUE (cohort_id, channel_id)
);

INSERT INTO ChannelList (cohort_id, channel_id, channel_name) VALUES (1, 'C01F7MF2FM2', 'london-class7');
INSERT INTO ChannelList (cohort_id, channel_id, channel_name) VALUES (2, 'C01SJ37VCTZ', 'scotland-class-5');
INSERT INTO ChannelList (cohort_id, channel_id, channel_name) VALUES (3, 'C025S75QZ38', 'westmidlands-class3');
INSERT INTO ChannelList (cohort_id, channel_id, channel_name) VALUES (4, 'C01V4EULPTM', 'north-west-class4');
INSERT INTO ChannelList (cohort_id, channel_id, channel_name) VALUES (5, 'CD6TBFHU4', 'southafrica');
INSERT INTO ChannelList (cohort_id, channel_id, channel_name) VALUES (6, 'C01F7MF2FM2', 'rome-class1');   