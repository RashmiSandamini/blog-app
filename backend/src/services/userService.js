import pool from '../database.js';

export const getUser = async (userId) => {
  try {
    const [rows] = await pool.query(
      'SELECT id,username, email, img FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      throw new Error('User not found');
    }
    return rows[0];
  } catch (err) {
    console.error('Error fetching user:', err.message);
    throw err;
  }
};

export const getPublishedByUserId = async (id) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM posts WHERE is_published = 1 and user_id = ?',
      [id]
    );
    if (result.length === 0) return null;
    const posts = result.map((post) => {
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

export const getDraftByUserId = async (id) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM posts WHERE is_published = 0 and user_id = ?',
      [id]
    );
    if (result.length === 0) return null;
    const posts = result.map((post) => {
      if (post.cover_photo) {
        const base64Image = Buffer.from(post.cover_photo).toString('base64');
        post.cover_photo = `data:image/jpeg;base64,${base64Image}`;
      }
      return post;
    });
    return posts;
  } catch (err) {
    console.error('Error fetching drafts posts:', err.message);
    throw err;
  }
};
