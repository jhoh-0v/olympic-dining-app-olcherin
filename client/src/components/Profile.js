import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const Profile = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4">내정보</Typography>
        {/* 사용자 정보를 표시할 내용 추가 */}
      </Box>
    </Container>
  );
};

export default Profile;
