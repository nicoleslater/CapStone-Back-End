DROP DATABASE IF EXISTS tidbits_dev;

CREATE DATABASE tidbits_dev;

\c tidbits_dev

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    video_url VARCHAR(255) NOT NULL,
    duration INTEGER, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- time permitting
CREATE TABLE closed_captions (
    id SERIAL PRIMARY KEY,
    timestamp INT NOT NULL, 
    text TEXT NOT NULL,
    video_id INTEGER REFERENCES videos (id) 
    ON DELETE CASCADE
);

-- -- future content
-- CREATE TABLE comments (
--     id SERIAL PRIMARY KEY,
--     video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
--     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     message TEXT NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE favorites (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );


