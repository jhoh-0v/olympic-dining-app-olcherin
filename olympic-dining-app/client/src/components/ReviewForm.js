import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

function ReviewForm({ diningId, review, onReviewUpdated }) {
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [comment, setComment] = useState(review ? review.comment : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (review) {
      await axios.put(
        `/api/reviews/${review._id}`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        `/api/reviews`,
        { diningId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    setRating(0);
    setComment('');
    onReviewUpdated();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Rating (1-5)"
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}

export default ReviewForm;
