const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Helper function to add year to rendering context
const addRenderContext = (req) => ({
  logged_in: req.session.logged_in,
  year: new Date().getFullYear()
});

// Route for home page
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      ...addRenderContext(req)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', addRenderContext(req));
});

// New route for signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup', addRenderContext(req));
});

// Updated route for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  console.log('Dashboard route - Session:', req.session);
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    if (!userData) {
      console.log('No user found with id:', req.session.user_id);
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    const user = userData.get({ plain: true });
    console.log('User data:', user);

    res.render('dashboard', {
      ...user,
      posts: user.Posts, // Make sure this matches your model association
      ...addRenderContext(req)
    });
  } catch (err) {
    console.error('Error in dashboard route:', err);
    res.status(500).json(err);
  }
});

module.exports = router;