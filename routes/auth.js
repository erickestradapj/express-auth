const { Router } = require('express');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');

const router = Router();

// Create new user
router.post('/new', createUser);

// Login user
router.post('/', loginUser);

// Revalidate token
router.get('/renew', revalidateToken);

module.exports = router;
