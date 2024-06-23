const express = require('express');
const {
  createReview,
  getReviewsByDiningId,
  deleteReview,
  searchReviews,
} = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createReview);
router.route('/:id').get(getReviewsByDiningId).delete(protect, deleteReview);
router.route('/search').get(searchReviews);

module.exports = router;
