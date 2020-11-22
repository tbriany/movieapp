DROP DATABASE if exists movieapp;
CREATE DATABASE movieapp;

\c movieapp

CREATE TABLE movieLikes 
(
    id SERIAL PRIMARY KEY,
    movie_title VARCHAR UNIQUE NOT NULL, 
    thumbs_up INT, 
    thumbs_down INT 
);

