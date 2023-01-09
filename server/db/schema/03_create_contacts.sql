-- schema/03_create_contacts.sql
DROP TABLE IF EXISTS contacts CASCADE;

-- timestamp function for updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CREATE CONTACTS
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255),
  tel_number VARCHAR(15),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON contacts
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();