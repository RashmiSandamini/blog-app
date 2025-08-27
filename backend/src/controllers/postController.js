import * as postService from '../services/postService.js';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAll();
    res.send(posts);
  } catch (err) {
    console.error('Failed to fetch posts:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Bad Request: Invalid ID' });
    }
    const post = await postService.getById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post Not Found' });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error('Error fetching post by ID:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = await postService.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Failed to create post:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createNewPost = async (req, res) => {
  try {
    const { title, subtitle, markdown } = req.body;
    const coverPhotoBuffer = req.file?.buffer;
    const userId = req.user.userId;

    const status = req.query.status;
    const isPublished = status === 'published' ? 1 : 0;

    if (isPublished) {
      if (
        !title?.trim() ||
        !subtitle?.trim() ||
        !markdown?.trim() ||
        !coverPhotoBuffer
      ) {
        return res.status(400).json({
          message:
            'Title, subtitle, content, and cover photo are required for publishing.',
        });
      }
    }

    const result = await postService.createNewPost({
      title: title ?? '',
      subtitle: subtitle ?? '',
      markdown: markdown ?? '',
      coverPhotoBuffer,
      userId,
      isPublished,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    if (err.message === 'Cover photo is required') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: 'Bad Request: Invalid ID' });

    const success = await postService.deleteById(id);
    if (!success) return res.status(404).json({ message: 'Post Not Found' });

    res.status(204).send();
  } catch (err) {
    console.error('Failed to delete post:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updatePost = async (req, res) => {
  const userId = req.user.userId;

  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: 'Bad Request: Invalid ID' });

    const status = req.query.status;
    const isPublished = status === 'published' ? 1 : 0;

    const coverPhotoBuffer = req.file?.buffer;

    const updatedPost = await postService.updateById(
      id,
      req.body,
      coverPhotoBuffer,
      userId,
      isPublished
    );

    if (!updatedPost)
      return res.status(404).json({ message: 'Post Not Found' });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Failed to update post:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
