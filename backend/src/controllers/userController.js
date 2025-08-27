import * as userService from '../services/userService.js';

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userService.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.img,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getPublishedPosts = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: 'Bad Request: Invalid ID' });

    const publishedPosts = await userService.getPublishedByUserId(id);

    res.status(200).json(publishedPosts || []);
  } catch (err) {
    console.error('Failed to fetch published stories: ', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getDraftPosts = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ message: 'Bad Request: Invalid ID' });

    const draftPosts = await userService.getDraftByUserId(id);

    res.status(200).json(draftPosts || []);
  } catch (err) {
    console.error('Failed to fetch draft stories: ', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
