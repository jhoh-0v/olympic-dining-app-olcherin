import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import { List, ListItem, ListItemText, Button, Box } from '@mui/material';

function ReviewList({ diningId }) {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${diningId}`);
        setReviews(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, [diningId]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews(reviews.filter(review => review._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
  };

  const handleReviewUpdated = () => {
    setEditingReview(null);
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${diningId}`);
        setReviews(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  };

  return (
    <Box>
      <h3>Reviews</h3>
      <List>
        {reviews.map(review => (
          <ListItem key={review._id}>
            <ListItemText
              primary={`${review.user.username} (${review.rating}/5)`}
              secondary={review.comment}
            />
            <Button variant="outlined" onClick={() => handleEdit(review)}>Edit</Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(review._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      {editingReview && (
        <ReviewForm
          diningId={diningId}
          review={editingReview}
          onReviewUpdated={handleReviewUpdated}
        />
      )}
    </Box>
  );
}

export default ReviewList;
