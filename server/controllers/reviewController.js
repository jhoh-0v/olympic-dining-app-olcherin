const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Dining = require('../models/Dining');

// 리뷰 생성
const createReview = asyncHandler(async (req, res) => {
  const { diningId, rating, comment } = req.body;

  console.log('Request Body:', req.body); // 요청 바디를 출력하여 확인

  if (!diningId) {
    res.status(400);
    throw new Error('Dining ID is required');
  }

  const dining = await Dining.findById(diningId);
  if (!dining) {
    res.status(404);
    throw new Error('Dining not found');
  }

  const review = new Review({
    user: req.user._id,
    dining: diningId,
    rating,
    comment,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});


const getReviewsByDiningId = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ dining: req.params.id });
  res.json(reviews);
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    await review.remove();
    res.json({ message: 'Review removed' });
  } else {
    res.status(404);
    throw new Error('Review not found');
  }
});

const searchReviews = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const reviews = await Review.find({
    $text: { $search: search },
  });
  res.json(reviews);
});

module.exports = {
  createReview,
  getReviewsByDiningId,
  deleteReview,
  searchReviews,
};
