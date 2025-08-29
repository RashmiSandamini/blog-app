import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import User from './user.js';

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover_photo: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
  }
);

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

export default Post;
