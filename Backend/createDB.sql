CREATE DATABASE IF NOT EXISTS mom;

USE mom;

-- Table for storing user information
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) PRIMARY KEY ,
    password_hash VARCHAR(255),
    is_verified BOOLEAN
);

-- Table for storing meeting details
CREATE TABLE IF NOT EXISTS meetings (
    meeting_id VARCHAR(255) PRIMARY KEY,
    meeting_name VARCHAR(255),
    email VARCHAR(255),
    is_shared BOOLEAN,
    FOREIGN KEY (email) REFERENCES users(email)
);


-- Table for storing minutes of meetings
CREATE TABLE IF NOT EXISTS minutesOfMeetings (
    meeting_id VARCHAR(255) PRIMARY KEY,
    transcript TEXT,
    summary TEXT,
    FOREIGN KEY (meeting_id) REFERENCES meetings(meeting_id)
);

-- Table for storing blacklisted JWT tokens
CREATE TABLE IF NOT EXISTS blacklistedtokens (
    token VARCHAR(255) PRIMARY KEY
);
INSERT INTO users (email, password_hash, is_verified) 
VALUES ('abc', '$2b$12$7fvZNJQH19EvoLs7ynUK4.80dvkaCFfo4YwFFJbixWBEVFJBGw5OS', true);

select * from users;