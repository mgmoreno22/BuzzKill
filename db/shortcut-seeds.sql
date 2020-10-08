-- File for fully resetting hardcoded database
-- DB should be auto-populated with sequelize

-- DATABASE
DROP DATABASE IF EXISTS buzzkill;
CREATE DATABASE buzzkill;
USE buzzkill;

-- USERS
CREATE TABLE `users` (
  user_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(75) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(32) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE (email)
);

-- EVENT TYPES
CREATE TABLE `event_types` (
  event_id INT NOT NULL AUTO_INCREMENT,
  event_name VARCHAR(75),
  PRIMARY KEY (event_id)
);

-- LOCATION TYPES
CREATE TABLE `location_types` (
  location_id INT NOT NULL AUTO_INCREMENT,
  location_type VARCHAR(75),
  PRIMARY KEY (location_id)
);

-- USER LOGIN ACTIVITY
CREATE TABLE `logins` (
  login_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  login_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(login_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- EVENT REPORTS
CREATE TABLE `reports` (
  report_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  address VARCHAR(255),
  location_id INT, 
  start_time DATETIME,
  notes TEXT,
  report_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (report_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (event_id) REFERENCES event_types(event_id),
  FOREIGN KEY (location_id) REFERENCES location_types(location_id)
);

INSERT INTO users (name, email, password) 
VALUES ("Richard Wichard", "test@test.com", "goodPass"), ("Jessica Wessica", "email@email.com", "myPassword");

INSERT INTO event_types(event_name)
VALUES ("Adult Party"), ("Children's Party"), ("Holiday Party"), ("Wedding Ceremony/Party");

INSERT INTO location_types(location_type)
VALUES ("public park"), ("food/dining"), ("bar/brewery"), ("lounge/nightclub"), ("indoor activity spot"), ("outdoor activity spot"), ("other");

INSERT INTO logins (user_id) VALUES (2);

INSERT INTO reports (user_id, event_id, address, location_id, notes)
VALUES (2, 3, "532 S Olive St, Los Angeles, CA 90013", 1, "Many people in the area together, no social distancing."), 
(1, 1, "448 S Hill St, Los Angeles, CA 90013", 3, "No masks, some social distancing in place");

SELECT * FROM users;
SELECT * FROM event_types;
SELECT * FROM location_types;
SELECT * FROM logins; 
SELECT * FROM reports;