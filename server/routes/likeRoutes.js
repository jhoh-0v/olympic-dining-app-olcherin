const express = require('express');
const {
  addLike,
  getLikesByReviewId,
} = require('../controllers/likeController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(protect, addLike);
router.route('/:id').get(getLikesByReviewId);

module.exports = router;
