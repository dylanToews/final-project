-- seeds/03_contacts.sql

-- Seed Dylan
INSERT INTO contacts (user_id, name, tel_number) VALUES (1, 'me', '16475302024');
INSERT INTO contacts (user_id, name, tel_number) VALUES (1, 'Ryan', '17802386933');
INSERT INTO contacts (user_id, name, tel_number) VALUES (1, 'Cheever', '19022926082');

-- Seed Ryan
INSERT INTO contacts (user_id, name, tel_number) VALUES (2, 'me', '17802386933');
INSERT INTO contacts (user_id, name, tel_number) VALUES (2, 'Dylan', '16475302024');
INSERT INTO contacts (user_id, name, tel_number) VALUES (2, 'Cheever', '19022926082');

-- Seed Cheever
INSERT INTO contacts (user_id, name, tel_number) VALUES (3, 'me', '19022926082');
INSERT INTO contacts (user_id, name, tel_number) VALUES (3, 'Dylan', '16475302024');
INSERT INTO contacts (user_id, name, tel_number) VALUES (3, 'Ryan', '17802386933');

-- Seed Guest
INSERT INTO contacts (user_id, name, tel_number) VALUES (4, 'Cheever', '19022926082');
INSERT INTO contacts (user_id, name, tel_number) VALUES (4, 'Dylan', '16475302024');
INSERT INTO contacts (user_id, name, tel_number) VALUES (4, 'Ryan', '17802386933');