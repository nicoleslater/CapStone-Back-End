import express from 'express';
import videoController from '../controllers/videoController.js';
const router = express.Router();

router.post('/session', videoController.creatingSession);

router.get('/token/:sessionId', videoController.generatingToken);
router.post('/start-recording', videoController.startVideoRecording);

router.post('/stop-recording', videoController.stopVideoRecording);

// router.get('/archives/:archiveId', videoController.getArchiveInformation);


router.post('/upload-recording', videoController.uploadVideo);



export default router;