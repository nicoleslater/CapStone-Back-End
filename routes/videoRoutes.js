import express from 'express';
import videoController from '../controllers/videoController.js';
const videos = express.Router();

videos.post('/session', videoController.creatingSession);

videos.get('/token/:sessionId', videoController.generatingToken);

videos.post('/start-recording', videoController.startVideoRecording);

videos.post('/stop-recording', videoController.stopVideoRecording);

videos.post('/upload-recording', videoController.uploadVideo);



export default videos;