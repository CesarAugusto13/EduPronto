const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const profileController = require('../controllers/profile.controller');
const upload = require('../config/upload');

router.get('/me', auth, profileController.me);
router.put('/', auth, profileController.update);
router.post('/foto', auth, upload.single('foto'), profileController.uploadFoto);

module.exports = router;
