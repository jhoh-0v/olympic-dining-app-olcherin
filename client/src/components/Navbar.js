import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  if (hideNavbar) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          올슐랭
        </Typography>
        <Button color="inherit" component={Link} to="/restaurants">
          식당목록
        </Button>
        <Button color="inherit" component={Link} to="/vote">
          추천메뉴
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          프로필
        </Button>
        <Button color="inherit" component={Link} to="/login">
          로그아웃
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
