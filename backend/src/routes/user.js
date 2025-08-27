import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

router.get('/', verifyToken, userController.getUser);
router.get('/published/:id', verifyToken, userController.getPublishedPosts);
router.get('/drafts/:id', verifyToken, userController.getDraftPosts);

export default router;
