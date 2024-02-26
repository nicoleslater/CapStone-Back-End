import express from 'express';
import { createSession, generateToken } from '../service/videoService.js'
import videoController from '../controllers/videoController.js';
const router = express.Router();

router.post('/create-session', videoController.createTidbitSession);

router.get('/generate-token/:sessionId', videoController.generateTidbitToken);
router.post('/start-recording', videoController.startTidbitRecording);

router.post('/stop-recording', videoController.stopTidbitRecording);

router.post('/upload-recording', videoController.uploadTidbit);



export default router;