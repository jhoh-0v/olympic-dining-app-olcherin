import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button, Link, MenuItem, Select, InputLabel, FormControl, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
  "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", 
  "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", 
  "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", 
  "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", 
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", 
  "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", 
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", 
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", 
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", 
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const sports = [
  "Archery", "Athletics", "Badminton", "Basketball", "Boxing", "Canoeing", "Cycling", "Diving", "Equestrian", "Fencing", 
  "Field Hockey", "Football", "Golf", "Gymnastics", "Handball", "Judo", "Karate", "Modern Pentathlon", "Rowing", "Rugby", 
  "Sailing", "Shooting", "Skateboarding", "Sport Climbing", "Surfing", "Swimming", "Table Tennis", "Taekwondo", 
  "Tennis", "Trampoline", "Triathlon", "Volleyball", "Water Polo", "Weightlifting", "Wrestling"
];
const bios = ["Male", "Female"];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [sport, setSport] = useState('');
  const [bio, setBio] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempError = {};
    if (!email) tempError.email = "이메일을 입력하세요";
    if (!password) tempError.password = "비밀번호를 입력하세요";
    if (!name) tempError.name = "이름을 입력하세요";
    if (!nickname) tempError.nickname = "닉네임을 입력하세요";
    if (!age) tempError.age = "나이를 선택하세요";
    if (!country) tempError.country = "국가를 선택하세요";
    if (!sport) tempError.sport = "종목을 선택하세요";
    if (!bio) tempError.bio = "성별을 선택하세요";
    setError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        email,
        password,
        name,
        nickname,
        age,
        country,
        sport,
        bio,
      };
      console.log('Sending user data:', userData); // 요청 데이터 확인
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', userData);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate('/login');
        }, 2000); // 2초 후 로그인 화면으로 이동
      } catch (error) {
        console.error('Error during registration:', error);
        setError({ general: error.response?.data?.message || 'Registration failed. Please try again.' });
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setError({});
  }, [email, password, name, nickname, age, country, sport, bio]);

  return (
    <Container maxWidth="xs">
      <Box mt={8} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          회원가입
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error.email}
            helperText={error.email}
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
          />
          <TextField
            label="이름"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!error.name}
            helperText={error.name}
          />
          <TextField
            label="닉네임"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            error={!!error.nickname}
            helperText={error.nickname}
          />
          <FormControl variant="outlined" fullWidth margin="normal" error={!!error.age}>
            <InputLabel>나이</InputLabel>
            <Select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              label="나이"
            >
              {Array.from({ length: 60 }, (_, i) => i + 1).map((age) => (
                <MenuItem key={age} value={age}>
                  {age}
                </MenuItem>
              ))}
            </Select>
            {error.age && <Typography color="error" variant="caption">{error.age}</Typography>}
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal" error={!!error.country}>
            <InputLabel>국가</InputLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              label="국가"
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
            {error.country && <Typography color="error" variant="caption">{error.country}</Typography>}
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal" error={!!error.sport}>
            <InputLabel>종목</InputLabel>
            <Select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              label="종목"
            >
              {sports.map((sport) => (
                <MenuItem key={sport} value={sport}>
                  {sport}
                </MenuItem>
              ))}
            </Select>
            {error.sport && <Typography color="error" variant="caption">{error.sport}</Typography>}
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal" error={!!error.bio}>
            <InputLabel>성별</InputLabel>
            <Select
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              label="성별"
            >
              {bios.map((bio) => (
                <MenuItem key={bio} value={bio}>
                  {bio}
                </MenuItem>
              ))}
            </Select>
            {error.bio && <Typography color="error" variant="caption">{error.bio}</Typography>}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            회원가입
          </Button>
        </form>
        {error.general && <Typography color="error" variant="caption">{error.general}</Typography>}
        <Box mt={2}>
          <Link href="/login" variant="body2">
            이미 계정이 있으신가요? 로그인
          </Link>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            회원가입이 성공적으로 완료되었습니다!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Register;