import pool from '../database.js';

export const getAll = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.is_published = 1
    `);
    const posts = rows.map((post) => {
      if (post.cover_photo) {
        const base64Image = Buffer.from(post.cover_photo).toString('base64');
        post.cover_photo = `data:image/jpeg;base64,${base64Image}`;
      }
      return post;
    });
    return posts;
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    throw err;
  }
};

export const getById = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         posts.*, 
         users.username 
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       WHERE posts.id = ?`,
      [id]
    );
    const post = rows[0];

    if (!post) return null;

    if (post.cover_photo) {
      post.cover_photo = `data:image/jpeg;base64,${post.cover_photo.toString(
        'base64'
      )}`;
    }

    return post;
  } catch (err) {
    console.error('Error fetching post by ID:', err.message);
    throw err;
  }
};

export const create = async (data) => {
  const { title, desc, img, uid } = data;
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
  const [result] = await pool.query(
    `INSERT INTO posts (title, \`desc\`, img, date, uid) VALUES (?, ?, ?, ?, ?)`,
    [title, desc, img, formattedDate, uid]
  );

  return {
    id: result.insertId,
    title,
    desc,
    img,
    formattedDate,
    uid,
  };
};

export const createNewPost = async ({
  title,
  subtitle,
  markdown,
  coverPhotoBuffer,
  userId,
}) => {
  if (!coverPhotoBuffer) {
    throw new Error('Cover photo is required');
  }

  await pool.execute(
    'INSERT INTO posts (title, subtitle, content, cover_photo, user_id, is_published) VALUES (?, ?, ?, ?, ?, ?)',
    [title, subtitle, markdown, coverPhotoBuffer, userId, true]
  );

  return { message: 'Post created successfully' };
};

export const deleteById = async (id) => {
  const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

export const updateById = async (id, data, coverPhotoBuffer, userId) => {
  const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
  if (rows.length === 0) return null;
  const { title, subtitle, markdown } = data;
  if (!coverPhotoBuffer) {
    const [result] = await pool.query(
      'UPDATE posts SET title = ?, subtitle = ?, content = ?, user_id=?, is_published=1 WHERE id = ?',
      [title, subtitle, markdown, userId, id]
    );
    return result.affectedRows > 0;
  } else {
    const [result] = await pool.query(
      'UPDATE posts SET title = ?, subtitle = ?, content = ?, cover_photo = ?, user_id=? WHERE id = ?',
      [title, subtitle, markdown, coverPhotoBuffer, userId, id]
    );
    return result.affectedRows > 0;
  }
};
