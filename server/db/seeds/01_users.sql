-- seeds/01_users.sql

-- Keep the migrations and seeds sequencial (meaning have the ordered alphabetically). A better way of naming these files with timestamps, or even using an npm package that help up is with migrations and seeds such as:

-- https://salsita.github.io/node-pg-migrate/#/

-- users seeds
INSERT INTO users (name, email, password) VALUES ('Rick', 'rick.sandchez@gmail.com', 'picklerick');
INSERT INTO users (name, email, password) VALUES ('Lisa', 'lisa.simpson@gmail.com', 'ehhhhh');
INSERT INTO users (name, email, password) VALUES ('Link', 'link@yahoo.com', 'hyrule');
INSERT INTO users (name, email, password) VALUES ('Simon', 'simon_bel123@mail.ca', 'dracula');
INSERT INTO users (name, email, password) VALUES ('Mario', 'mario@mushroomkindom.jp', 'plumber79');