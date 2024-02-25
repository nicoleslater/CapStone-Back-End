// videoController.js
const AWS = require('aws-sdk');
const fs = require('fs');

// Initialize AWS SDK
const s3 = new AWS.S3();

// Controller function for uploading a video file to S3
exports.uploadVideo = async (req, res) => {
  try {
    const file = req.file; // Assuming you're using multer for file upload middleware

    // Read file content
    const fileContent = fs.readFileSync(file.path);

    // Upload parameters
    const params = {
      Bucket: 'capstone-2024-tidbits', // Specify your S3 bucket name
      Key: file.originalname, // Use the original file name as the S3 object key
      Body: fileContent,
      ContentType: file.mimetype // Set the content type of the file
    };

    // Upload file to S3
    await s3.upload(params).promise();

    // Clean up temporary file
    fs.unlinkSync(file.path);

    res.status(200).send('Video uploaded successfully.');
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller function for downloading a video file from S3
exports.downloadVideo = async (req, res) => {
  try {
    const key = req.params.key; // Assuming you're passing the S3 object key as a parameter

    // Download parameters
    const params = {
      Bucket: 'capstone-2024-tidbits', // Specify your S3 bucket name
      Key: key // The key of the video file to download
    };

    // Download file from S3
    const data = await s3.getObject(params).promise();

    res.set('Content-Type', data.ContentType);
    res.send(data.Body);
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller function for deleting a video file from S3
exports.deleteVideo = async (req, res) => {
  try {
    const key = req.params.key; // Assuming you're passing the S3 object key as a parameter

    // Delete parameters
    const params = {
      Bucket: 'capstone-2024-tidbits', // Specify your S3 bucket name
      Key: key // The key of the video file to delete
    };

    // Delete file from S3
    await s3.deleteObject(params).promise();

    res.status(200).send('Video deleted successfully.');
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller function for updating a video file in S3 (if needed)
exports.updateVideo = async (req, res) => {
  // Add logic for updating video file in S3 (if needed)
};
