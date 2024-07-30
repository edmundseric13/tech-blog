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

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log('User posts:', posts);

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error in dashboard route:', err);
    res.status(500).render('error', { message: 'An error occurred while fetching posts.' });
  }
});

router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).render('error', { message: 'No post found with this id or you do not have permission to edit this post.' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error in edit post route:', err);
    res.status(500).render('error', { message: 'An error occurred while fetching the post to edit.' });
  }
});

module.exports = router;