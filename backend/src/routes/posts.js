import express from 'express';
const router = express.Router();
import * as postController from '../controllers/postController.js';

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.delete('/:id', postController.deletePost);
router.put('/:id', postController.updatePost);

export default router;
