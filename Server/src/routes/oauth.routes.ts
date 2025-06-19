import express from 'express';
import { googleOAuthLogin } from '../controllers/oauth.controller.js';

const router = express.Router();
router.post('/oauth/google',googleOAuthLogin);

export default router;
