CREATE TABLE CohortList (
  id             SERIAL PRIMARY KEY,
  cohort_name    VARCHAR(30) NOT NULL,
  CONSTRAINT "CohortList_cohort_unique" UNIQUE (cohort_name)
);

INSERT INTO CohortList (cohort_name) VALUES ('London');
INSERT INTO CohortList (cohort_name) VALUES ('Scotland');
INSERT INTO CohortList (cohort_name) VALUES ('West Midlands');
INSERT INTO CohortList (cohort_name) VALUES ('North West');
INSERT INTO CohortList (cohort_name) VALUES ('South Africa');
INSERT INTO CohortList (cohort_name) VALUES ('Rome');
INSERT INTO CohortList (cohort_name) VALUES ('Test');