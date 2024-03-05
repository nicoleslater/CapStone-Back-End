import express from 'express';
import { creatingSession, generatingToken } from '../controllers/videoController';

const router = express.Router();

router.post('/session', creatingSession);
router.get('/token/:sessionId', generatingToken);

export default sessionsRouter;