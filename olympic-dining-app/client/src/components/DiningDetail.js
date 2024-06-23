import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import ReviewList from './ReviewList';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

function DiningDetail() {
  const { id } = useParams();
  const [dining, setDining] = useState(null);

  useEffect(() => {
    const fetchDining = async () => {
      const response = await axios.get(`/api/dining/${id}`);
      setDining(response.data);
    };

    fetchDining();
  }, [id]);

  if (!dining) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {dining.name}
      </Typography>
      <Typography variant="body1">{dining.location}</Typography>
      <Typography variant="h6" component="h2">
        Menu
      </Typography>
      <List>
        {dining.menu.map((item) => (
          <ListItem key={item.name}>
            <ListItemText
              primary={item.name}
              secondary={`Description: ${item.description}, Price: $${item.price}, Nutrition: ${item.nutrition}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" component="h2">
        Reviews
      </Typography>
      <ReviewList diningId={id} />
      <Typography variant="h6" component="h2">
        Comments
      </Typography>
      <CommentForm diningId={id} />
      <CommentList diningId={id} />
    </Container>
  );
}

export default DiningDetail;
