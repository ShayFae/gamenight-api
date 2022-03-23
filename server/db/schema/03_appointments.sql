DROP TABLE IF EXISTS appointments CASCADE;
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY NOT NULL,
  host_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  room SERIAL NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  game VARCHAR(255) NOT NULL
);