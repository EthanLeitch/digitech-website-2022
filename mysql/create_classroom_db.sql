-- usage: source path/to/script.sql
CREATE DATABASE classroom_db;
USE classroom_db;
CREATE TABLE classrooms 
(
    RoomNumber int NOT NULL,
    Latitude DECIMAL(8, 6),
    Longitude DECIMAL(9, 6)
);
-- Latitude and Longitude: ##.###### and ###.######
INSERT INTO classrooms (RoomNumber, Latitude, Longitude) VALUES (26, '-45.855180', '170.498000')
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
-- flush privileges;