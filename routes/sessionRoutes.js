import express from 'express';
import { createTidbitSession, generateTidbitToken } from '../controllers/videoController';

const router = express.Router();

router.post('/create-session', createTidbitSession);
router.get('/generate-token/:sessionId', generateTidbitToken);

export default sessionsRouter;
