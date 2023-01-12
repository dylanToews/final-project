-- seeds/01_users.sql

-- Keep the migrations and seeds sequencial (meaning have the ordered alphabetically). A better way of naming these files with timestamps, or even using an npm package that help up is with migrations and seeds such as:

-- https://salsita.github.io/node-pg-migrate/#/

-- users seeds

INSERT INTO users (name, email, password) VALUES ('Dylan', 'dylan@fakeemail.com', 'dylan');
INSERT INTO users (name, email, password) VALUES ('Ryan', 'ryan@fakeemail.com', 'ryan');
INSERT INTO users (name, email, password) VALUES ('Cheever', 'cheever@fakeemail.com', 'cheever');
INSERT INTO users (name, email, password) VALUES ('guest_test', 'guest-test@fakeemail.com', 'guest');