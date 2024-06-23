import React from 'react';
import { Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import OlympicLogo from '../assets/pngwing.com.png'; // 이미지 경로를 맞게 수정

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Box mb={3}>
          <img src={OlympicLogo} alt="Olympic Logo" style={{ width: '50%', height: 'auto' }} />
        </Box>
        <Button component={Link} to="/login" variant="contained" color="primary">
          로그인
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
