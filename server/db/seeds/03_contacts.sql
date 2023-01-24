-- seeds/03_contacts.sql

-- Seed Dylan
INSERT INTO contacts (user_id, name, tel_number) VALUES (1, 'me', '0000000001');
INSERT INTO contacts (user_id, name, tel_number) VALUES (1, 'Ryan', '0000000002');
INSERT INTO contacts (user_id, name, tel_number) VALUES (1, 'Cheever', '0000000003');

-- Seed Ryan
INSERT INTO contacts (user_id, name, tel_number) VALUES (2, 'me', '0000000004');
INSERT INTO contacts (user_id, name, tel_number) VALUES (2, 'Dylan', '0000000005');
INSERT INTO contacts (user_id, name, tel_number) VALUES (2, 'Cheever', '0000000006');

-- Seed Cheever
INSERT INTO contacts (user_id, name, tel_number) VALUES (3, 'me', '0000000007');
INSERT INTO contacts (user_id, name, tel_number) VALUES (3, 'Dylan', '0000000008');
INSERT INTO contacts (user_id, name, tel_number) VALUES (3, 'Ryan', '0000000009');

-- Seed Guest
INSERT INTO contacts (user_id, name, tel_number) VALUES (4, 'Cheever', '0000000010');
INSERT INTO contacts (user_id, name, tel_number) VALUES (4, 'Dylan', '0000000011');
INSERT INTO contacts (user_id, name, tel_number) VALUES (4, 'Ryan', '0000000012');