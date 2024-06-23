import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

function CommentList({ diningId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${diningId}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [diningId]);

  return (
    <Paper style={{ padding: 16, marginTop: 16 }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment._id}>
            <ListItemText primary={comment.comment} secondary={comment.user.username} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default CommentList;
