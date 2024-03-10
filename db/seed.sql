INSERT INTO users (firebase_uid, username, email) VALUES
('firebaseuser1', 'user1', 'user1@example.com'),
('firebaseuser2', 'user2', 'user2@example.com');

INSERT INTO videos (user_id, title, summary, video_url, duration) SELECT
    users.id, 'First Video', 'A summary of the first video', 'http://example.com/firstvideo.mp4', 120 FROM users WHERE firebase_uid='firebaseuser1'
UNION SELECT
    users.id, 'Second Video', 'A summary of the second video', 'http://example.com/secondvideo.mp4', 150 FROM users WHERE firebase_uid='firebaseuser2';