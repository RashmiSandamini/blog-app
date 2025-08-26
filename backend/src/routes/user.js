import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

router.get('/', verifyToken, userController.getUser);

export default router;
