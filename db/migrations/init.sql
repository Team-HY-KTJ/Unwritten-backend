CREATE DATABASE IF NOT EXISTS unwritten_db;
USE unwritten_db;

CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(50) NOT NULL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL
);

INSERT INTO users (user_id, nickname) VALUES ("00000000", "steve");