-- seeds/04_alarms.sql

-- Seed Dylan
INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) VALUES (1, 1, 1, '11', '30', 'AM');
INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) VALUES (1, 2, 1, '01', '00', 'PM');
INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) VALUES (1, 3, 1, '04', '15', 'PM');

-- Seed Ryan
INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) VALUES (2, 4, 4, '11', '30', 'AM');
INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) VALUES (2, 5, 4, '01', '00', 'PM');
INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) VALUES (2, 6, 4, '04', '15', 'PM');

-- Seed Cheever
INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) VALUES (3, 7, 7, '11', '30', 'AM');
INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) VALUES (3, 8, 7, '01', '00', 'PM');
INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) VALUES (3, 9, 7, '04', '15', 'PM');

-- Seed Guest (no alarms)