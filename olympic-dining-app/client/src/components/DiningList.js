import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

function DiningList() {
  const [dinings, setDinings] = useState([]);

  useEffect(() => {
    const fetchDinings = async () => {
      const response = await axios.get('/api/dining');
      setDinings(response.data);
    };

    fetchDinings();
  }, []);

  if (!dinings.length) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dining List
      </Typography>
      <List>
        {dinings.map((dining) => (
          <ListItem button component={Link} to={`/dining/${dining._id}`} key={dining._id}>
            <ListItemText primary={dining.name} secondary={dining.location} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default DiningList;
