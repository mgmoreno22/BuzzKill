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