DROP TABLE IF EXISTS games CASCADE;
CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  host_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  room_id INTEGER REFERENCES rooms(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  time DATE
);