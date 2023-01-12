-- schema/04_create_alarms.sql
DROP TABLE IF EXISTS alarms CASCADE;

-- timestamp function for updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CREATE ALARMS
CREATE TABLE alarms (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  sound_id integer REFERENCES sounds(id) ON DELETE CASCADE NOT NULL,
  contact_id integer REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  hour VARCHAR(2) NOT NULL,
  minute VARCHAR(2) NOT NULL,
  am_pm VARCHAR(2) NOT NULL,
  active BOOL NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON alarms
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();