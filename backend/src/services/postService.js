import pool from '../database.js';

export const getAll = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.uid = users.id
    `);
    return rows;
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
       JOIN users ON posts.uid = users.id 
       WHERE posts.id = ?`,
      [id]
    );
    return rows[0];
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
    date,
    uid,
  };
};

export const deleteById = async (id) => {
  const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

export const updateById = async (id, data) => {
  const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
  if (rows.length === 0) return null;

  const { title, desc, img } = data;
  const [result] = await pool.query(
    'UPDATE posts SET title = ?, `desc` = ?, img = ? WHERE id = ?',
    [title, desc, img, id]
  );
  return result.affectedRows > 0;
};
