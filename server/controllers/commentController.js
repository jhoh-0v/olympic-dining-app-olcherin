const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');

const createComment = asyncHandler(async (req, res) => {
  const { comment, diningId } = req.body;

  const newComment = new Comment({
    user: req.user._id,
    dining: diningId,
    comment,
  });

  const createdComment = await newComment.save();
  res.status(201).json(createdComment);
});

const getCommentsByDiningId = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ dining: req.params.id });
  res.json(comments);
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    await comment.remove();
    res.json({ message: 'Comment removed' });
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

module.exports = {
  createComment,
  getCommentsByDiningId,
  deleteComment,
};
