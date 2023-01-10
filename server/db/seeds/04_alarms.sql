-- seeds/04_alarms.sql

-- Seed Rick
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (1, 1, 1, 'Alarm 1', '01:00 PM');
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (1, 2, 2, 'Alarm 2', '02:00 PM');
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (1, 3, 3, 'Alarm 3', '02:30 PM');
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (1, 4, 4, 'Alarm 4', '03:00 PM');

-- Seed Lisa
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (2, 5, 5, 'Alarm 5', '04:00 PM');
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (2, 5, 6, 'Alarm 6', '04:30 PM');
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (2, 6, 8, 'Alarm 7', '10:00 AM');
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (2, 7, 8, 'Alarm 8', '11:00 AM');

-- Seed Link
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (3, 9, 9, 'Wake Up', '09:00 AM');
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (3, 9, 9, 'Go To Gym', '11:00 AM');
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (3, 9, 9, 'Brush Teeth Before Bed', '09:00 PM');

-- Seed Simon
INSERT INTO alarms (user_id, sound_id, contact_id, title, set_for) VALUES (4, 12, 12, 'Alarm 12', '11:00 AM');

-- Seed Mario (no alarms)