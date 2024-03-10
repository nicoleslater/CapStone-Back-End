import express from 'express';
const router = express.Router();
import { uploadFile, downloadFile, deleteFile, listFiles } from '../controllers/s3Controller.js'; // Adjusted import
import upload from './uploadMiddleware.js';  

// POST route for file upload
router.post('/upload', upload.single('file'), (req, res, next) => {
    console.log('Uploading (uploadRoutes) file:', req.file.originalname);
    next();
  }, uploadFile);
  
router.get('/download/:filename', (req, res, next) => {
  console.log('Downloading (uploadRoutes) file:', req.params.filename);
  next();
}, downloadFile);

router.delete('/delete/:filename', (req, res, next) => {
  console.log('Deleting (uploadRoutes) file:', req.params.filename);
  next();
}, deleteFile);

router.get('/list', listFiles)


export default router;