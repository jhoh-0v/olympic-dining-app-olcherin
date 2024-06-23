const express = require('express');
const {
  createComment,
  getCommentsByDiningId,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createComment);
router.route('/:id').get(getCommentsByDiningId).delete(protect, deleteComment);

module.exports = router;
