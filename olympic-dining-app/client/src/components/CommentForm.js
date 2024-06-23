import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

function CommentForm({ diningId, onCommentAdded }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(
      `/api/comments`,
      { diningId, comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setComment('');
    onCommentAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default CommentForm;
