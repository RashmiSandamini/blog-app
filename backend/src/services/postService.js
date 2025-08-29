import Post from '../models/post.js';
import User from '../models/user.js';

export const getAll = async () => {
  try {
    const postsResults = await Post.findAll({
      where: {
        is_published: true,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      raw: true,
      nest: true,
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
    console.error('Error fetching posts:', err.message);
    throw err;
  }
};

export const getById = async (id) => {
  try {
    const post = await Post.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      raw: true,
      nest: true,
    });

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

export const createNewPost = async ({
  title,
  subtitle,
  markdown,
  coverPhotoBuffer,
  userId,
  isPublished,
}) => {
  if (!coverPhotoBuffer) {
    throw new Error('Cover photo is required');
  }

  try {
    await Post.create({
      title,
      subtitle,
      content: markdown,
      cover_photo: coverPhotoBuffer,
      user_id: userId,
      is_published: isPublished,
    });

    return { message: 'Post created successfully' };
  } catch (error) {
    console.error('Error creating post: ', error.message);
    throw error;
  }
};

export const deleteById = async (id) => {
  try {
    const deletedCount = await Post.destroy({
      where: { id },
    });

    return deletedCount > 0;
  } catch (error) {
    console.error('Error deleting post: ', error.message);
    throw error;
  }
};

export const updateById = async (
  id,
  data,
  coverPhotoBuffer,
  userId,
  isPublished
) => {
  try {
    const post = await Post.findByPk(id);
    if (!post) return null;

    const { title, subtitle, markdown } = data;

    const updateData = {
      title,
      subtitle,
      content: markdown,
      user_id: userId,
      is_published: isPublished,
    };

    if (coverPhotoBuffer) {
      updateData.cover_photo = coverPhotoBuffer;
    }

    const [updatedCount] = await Post.update(updateData, {
      where: { id },
    });

    return updatedCount > 0;
  } catch (error) {
    console.error('Error updating post: ', err.message);
    throw error;
  }
};
