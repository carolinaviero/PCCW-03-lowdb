const express = require('express');
const router = express.Router();
const { createUser, loginUser, accessSecretRoute } = require('../controllers/auth-controller')

router.post('/signup', createUser)

router.post('/login', loginUser);

router.get('/secret', accessSecretRoute)

module.exports = router;