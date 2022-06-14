-- usage: source path/to/script.sql
CREATE DATABASE classroom_db;
USE classroom_db;
CREATE TABLE classrooms 
(
    RoomNumber int NOT NULL,
    Coordinates POINT NOT NULL
);