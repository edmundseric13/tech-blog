const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations
User.associate = (models) => {
  User.hasMany(models.Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
};

Post.associate = (models) => {
  Post.belongsTo(models.User, {
    foreignKey: 'user_id'
  });
  Post.hasMany(models.Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
  });
};

Comment.associate = (models) => {
  Comment.belongsTo(models.User, {
    foreignKey: 'user_id'
  });
  Comment.belongsTo(models.Post, {
    foreignKey: 'post_id'
  });
};

// Call associate functions
const models = { User, Post, Comment };
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;