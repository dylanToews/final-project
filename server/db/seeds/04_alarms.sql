-- seeds/04_alarms.sql

-- Seed Dylan
INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) VALUES (1, 1, 1, 'Make lunch', '11', '30', 'AM', 690);
INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) VALUES (1, 2, 1, 'Afternoon Meeting', '01', '00', 'PM', 780);
INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) VALUES (1, 3, 1, 'Go to the gym', '04', '15', 'PM', 975);

-- Seed Ryan
INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) VALUES (2, 4, 4, 'Make lunch', '11', '30', 'AM', 690);
INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) VALUES (2, 5, 4, 'Afternoon Meeting', '01', '00', 'PM', 780);
INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) VALUES (2, 6, 4, 'Go to the gym', '04', '15', 'PM', 975);

-- Seed Cheever
INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) VALUES (3, 7, 7, 'Make lunch', '11', '30', 'AM', 690);
INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) VALUES (3, 8, 7, 'Afternoon Meeting', '01', '00', 'PM', 780);
INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) VALUES (3, 9, 7, 'Go to the gym', '04', '15', 'PM', 975);

-- Seed Guest (no alarms)