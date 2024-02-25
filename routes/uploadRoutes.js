const express = require('express');
const router = express.Router();
const s3Controller = require('../controllers/s3Controller.js');
const upload = require('./uploadMiddleware.js'); // Use the multer configuration from the middleware
const videoController = require('../controllers/videoController.js');
router.delete('delete/:filename', videoController.deleteVideo);

// const upload = multer();

// POST route for file upload
router.post('/upload', upload.single('file'), (req, res, next) => {
    console.log('Uploading (uploadRoutes) file:', req.file.originalname);
    next();
  }, s3Controller.uploadFile);
  
router.get('/download/:filename', (req, res, next) => {
  console.log('Downloading (uploadRoutes) file:', req.params.filename);
  next();
}, s3Controller.downloadFile);

router.delete('/delete/:filename', (req, res, next) => {
  console.log('Deleting (uploadRoutes) file:', req.params.filename);
  next();
}, s3Controller.deleteFile);


module.exports = router;
