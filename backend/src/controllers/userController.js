import * as userService from '../services/userService.js';

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userService.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
      profilePicture: user.img,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
