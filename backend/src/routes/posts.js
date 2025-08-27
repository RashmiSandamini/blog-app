import express from 'express';
const router = express.Router();
import multer from 'multer';

import * as postController from '../controllers/postController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

router.post(
  '/',
  verifyToken,
  upload.single('coverPhoto'),
  postController.createNewPost
);
router.delete('/:id', verifyToken, postController.deletePost);
router.put(
  '/:id',
  verifyToken,
  upload.single('coverPhoto'),
  postController.updatePost
);

export default router;
