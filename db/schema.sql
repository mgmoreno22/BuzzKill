-- DATABASE
-- DROP DATABASE IF EXISTS buzzkill;
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