import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Stack } from '@mui/material';

function Home() {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Olympic Dining App
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button component={Link} to="/login" variant="contained" color="primary">
          Login
        </Button>
        <Button component={Link} to="/register" variant="contained" color="secondary">
          Register
        </Button>
        <Button component={Link} to="/dining" variant="contained" color="success">
          Dining List
        </Button>
        <Button component={Link} to="/profile" variant="contained" color="info">
          Profile
        </Button>
      </Stack>
    </Container>
  );
}

export default Home;
