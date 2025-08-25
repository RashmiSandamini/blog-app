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
    console.log('Parsed ID:', id);
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
    console.log('Request Body:', req.body);
    const newPost = await postService.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Failed to create post:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
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
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: 'Bad Request: Invalid ID' });

    const updatedPost = await postService.updateById(id, req.body);
    console.log('Updated Post:', updatedPost);
    if (!updatedPost)
      return res.status(404).json({ message: 'Post Not Found' });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Failed to update post:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
