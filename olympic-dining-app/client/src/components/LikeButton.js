import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function LikeButton({ reviewId }) {
  const [likes, setLikes] = useState(0);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/likes',
        { reviewId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(likes + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleLike} variant="contained" color="primary">
      Like ({likes})
    </Button>
  );
}

export default LikeButton;
