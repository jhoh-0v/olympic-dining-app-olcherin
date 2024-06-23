import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress } from '@mui/material';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">Username: {profile.username}</Typography>
      <Typography variant="body1">Email: {profile.email}</Typography>
    </Container>
  );
}

export default Profile;
