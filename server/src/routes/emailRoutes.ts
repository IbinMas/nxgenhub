import { Router } from 'express';
import { sendMailHandler } from '../controllers/emailController.js';

const router = Router();

router.post('/send-email', sendMailHandler);
router.post('/send', sendMailHandler);

export default router;
