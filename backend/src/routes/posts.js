import express from 'express';
const router = express.Router();
import * as postController from '../controllers/postController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

router.post('/', verifyToken, postController.createPost);
router.delete('/:id', verifyToken, postController.deletePost);
router.put('/:id', verifyToken, postController.updatePost);

export default router;
