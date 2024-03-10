DROP DATABASE IF EXISTS tidbits_dev;
CREATE DATABASE tidbits_dev;

\c tidbits_dev

-- Drop the tables if they exist to prevent errors
-- Assuming tidbits_dev database is already created and connected to.

-- Drop the tables if they exist to prevent errors, in reverse order of dependency
DROP TABLE IF EXISTS closed_captions CASCADE;
DROP TABLE IF EXISTS videos CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Recreate the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Should be hashed
    service_branch VARCHAR(255) NOT NULL,
    years_of_service INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recreate the videos table
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    ai_summary TEXT,
    video_url VARCHAR(255) NOT NULL, -- URL from S3
    s3_key VARCHAR(255) NOT NULL, -- To identify the file in S3 bucket
    duration INTEGER NOT NULL, -- Duration in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recreate the closed_captions table
CREATE TABLE closed_captions (
    id SERIAL PRIMARY KEY,
    video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
    timestamp INT NOT NULL, 
    text TEXT NOT NULL
);

-- -- Additional tables as needed, uncommented and corrected from your submission
-- CREATE TABLE messages (
--     id SERIAL PRIMARY KEY,
--     sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     message TEXT NOT NULL,
--     sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE favorites (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     UNIQUE(user_id, video_id) -- Prevents duplicate entries
-- );

CREATE TABLE video_views (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

// schema.sql:
// DROP DATABASE IF EXISTS tidbits_dev;

// CREATE DATABASE tidbits_dev;

// \c tidbits_dev

// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     firebase_uid VARCHAR(255) NOT NULL UNIQUE,
//     username VARCHAR(255) NOT NULL UNIQUE,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE videos (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//     title VARCHAR(255) NOT NULL,
//     summary TEXT,
//     video_url VARCHAR(255) NOT NULL,
//     duration INTEGER, 
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// -- time permitting
// CREATE TABLE closed_captions (
//     id SERIAL PRIMARY KEY,
//     video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
//     timestamp INT NOT NULL, 
//     text TEXT NOT NULL
// );

// -- -- future content
// -- CREATE TABLE comments (
// --     id SERIAL PRIMARY KEY,
// --     video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
// --     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
// --     message TEXT NOT NULL,
// --     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// -- );

// -- CREATE TABLE favorites (
// --     id SERIAL PRIMARY KEY,
// --     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
// --     video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
// --     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// -- );