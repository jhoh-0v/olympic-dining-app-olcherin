import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Link, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      if (response.status === 200) {
        setOpen(true);
        setIsLoggedIn(true);
        setTimeout(() => {
          setOpen(false);
          navigate('/restaurants');
        }, 2000); // 2초 후 식당 목록 페이지로 이동
      }
    } catch (error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          로그인
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            로그인
          </Button>
        </form>
        <Box mt={2}>
          <Link href="/register" variant="body2">
            계정이 없으신가요? 회원가입
          </Link>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            로그인에 성공했습니다!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Login;
