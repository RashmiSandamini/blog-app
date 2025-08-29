import pool from '../database.js';
import User from '../models/user.js';
import Post from '../models/post.js';

export const getUser = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    console.error('Error fetching user:', err.message);
    throw err;
  }
};

export const getPublishedByUserId = async (userId) => {
  try {
    const postsResults = await Post.findAll({
      where: {
        user_id: userId,
        is_published: 1,
      },
      raw: true,
    });

    if (postsResults.length === 0) return null;

    const posts = postsResults.map((post) => {
      if (post.cover_photo) {
        const base64Image = Buffer.from(post.cover_photo).toString('base64');
        post.cover_photo = `data:image/jpeg;base64,${base64Image}`;
      }
      return post;
    });

    return posts;
  } catch (err) {
    console.error('Error fetching published posts:', err.message);
    throw err;
  }
};

export const getDraftByUserId = async (userId) => {
  try {
    const postsResults = await Post.findAll({
      where: {
        user_id: userId,
        is_published: 0,
      },
      raw: true,
    });

    if (postsResults.length === 0) return null;

    const posts = postsResults.map((post) => {
      if (post.cover_photo) {
        const base64Image = Buffer.from(post.cover_photo).toString('base64');
        post.cover_photo = `data:image/jpeg;base64,${base64Image}`;
      }
      return post;
    });

    return posts;
  } catch (err) {
    console.error('Error fetching published posts:', err.message);
    throw err;
  }
};
