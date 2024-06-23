const asyncHandler = require('express-async-handler');
const Like = require('../models/Like');

const addLike = asyncHandler(async (req, res) => {
  const { reviewId } = req.body;

  const newLike = new Like({
    user: req.user._id,
    review: reviewId,
  });

  const createdLike = await newLike.save();
  res.status(201).json(createdLike);
});

const getLikesByReviewId = asyncHandler(async (req, res) => {
  const likes = await Like.find({ review: req.params.id });
  res.json(likes);
});

module.exports = {
  addLike,
  getLikesByReviewId,
};
