\c tidbits_dev

-- Seed data for the users table
INSERT INTO users (firebase_uid, username, email) VALUES
('firebaseuser1', 'user1', 'user1@example.com'),
('firebaseuser2', 'user2', 'user2@example.com');

-- Seed data for the videos table
INSERT INTO videos (user_id, title, summary, video_url, duration) VALUES
(1, 'First Video', 'A summary of the first video', 'http://example.com/firstvideo.mp4', 120),
(2, 'Second Video', 'A summary of the second video', 'http://example.com/secondvideo.mp4', 150);


