const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', {
    logged_in: req.session.logged_in
  });
});

router.get('/', withAuth, async (req, res) => {
  console.log('Dashboard route - Session:', req.session);
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!postData) {
      console.log('No posts found for user id:', req.session.user_id);
      res.status(404).json({ message: 'No posts found for this user' });
      return;
    }

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log('User posts:', posts);

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error in dashboard route:', err);
    res.status(500).json(err);
  }
});

module.exports = router;