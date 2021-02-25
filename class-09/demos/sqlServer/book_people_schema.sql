-- psql -f book_people_schema.sql -d book_people

DROP TABLE book_people;

CREATE TABLE book_people (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  fav_book VARCHAR(255),
  class INTEGER
)