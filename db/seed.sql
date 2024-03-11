-- Seed data for the users table
INSERT INTO users (email, password, service_branch, years_of_service, created_at) VALUES
('user1@example.com', 'hashed_password_1', 'Branch1', 5, NOW()),
('user2@example.com', 'hashed_password_2', 'Branch2', 10, NOW());

-- Since user_id references are to be consistent, ensure the user IDs match actual IDs in users table.
-- For demonstration, assuming IDs 1 and 2 exist. Adjust if different.
INSERT INTO videos (user_id, title, summary, ai_summary, video_url, s3_key, duration, created_at) VALUES
(1, 'The Nature of Code', 'An introduction to coding simulations of natural systems.', 'Comprehensive overview on simulating natural systems through code.', 'http://example.com/the-nature-of-code.mp4', 'videos/the-nature-of-code.mp4', 3600, NOW()),
(2, 'AI for Everyone', 'A beginner’s guide to understanding AI and its implications.', 'Insightful summary on the basics of AI and its impact.', 'http://example.com/ai-for-everyone.mp4', 'videos/ai-for-everyone.mp4', 5400, NOW());

INSERT INTO closed_captions (video_id, timestamp, text) VALUES
(1, 0, 'Welcome to The Nature of Code.'),
(1, 10, 'In this video, we will explore simulations of natural systems using coding.'),
(1, 20, 'Let’s start with an introduction to vectors.'),
(2, 0, 'Hello and welcome to AI for Everyone.'),
(2, 10, 'Today, we’ll discuss what AI is and why it matters.'),
(2, 20, 'We’ll also look at how AI is being used in various industries today.');
