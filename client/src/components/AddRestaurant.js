import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Chip, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [hours, setHours] = useState('');
  const [menu, setMenu] = useState([{ name: '', price: '', proteinTags: [], carbTags: [], spiceLevel: '', saltLevel: '' }]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleMenuChange = (index, field, value) => {
    const newMenu = [...menu];
    newMenu[index][field] = value;
    setMenu(newMenu);

    if (field === 'name' || field === 'price') {
      // Check if the last menu item has values for 'name' and 'price'
      if (newMenu[index].name && newMenu[index].price && index === menu.length - 1) {
        setMenu([...menu, { name: '', price: '', proteinTags: [], carbTags: [], spiceLevel: '', saltLevel: '' }]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !hours || !menu[0].name || !menu[0].price) {
      setMessage('필수 정보를 모두 입력하세요.');
      setSeverity('error');
      setOpen(true);
      return;
    }
    try {
      const filteredMenu = menu.filter(item => item.name && item.price);
      const formattedMenu = filteredMenu.map((item) => ({
        name: item.name,
        price: item.price,
        tags: [...item.proteinTags, ...item.carbTags, item.spiceLevel, item.saltLevel].filter(Boolean),
      }));
      const response = await axios.post('http://localhost:5000/api/dining/add', {
        name,
        image,
        hours,
        menu: formattedMenu,
      });
      if (response.status === 201) {
        setMessage('식당이 성공적으로 추가되었습니다!');
        setSeverity('success');
        setOpen(true);
        setName('');
        setImage('');
        setHours('');
        setMenu([{ name: '', price: '', proteinTags: [], carbTags: [], spiceLevel: '', saltLevel: '' }]);
      }
    } catch (error) {
      console.error('Error adding restaurant', error);
      setMessage('식당 추가에 실패했습니다.');
      setSeverity('error');
      setOpen(true);
    }
  };

  useEffect(() => {
    const lastMenuItem = menu[menu.length - 1];
    if (lastMenuItem.name && lastMenuItem.price) {
      setMenu([...menu, { name: '', price: '', proteinTags: [], carbTags: [], spiceLevel: '', saltLevel: '' }]);
    }
  }, [menu]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Restaurant
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="식당 이름"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="이미지 URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            label="영업 시간"
            variant="outlined"
            fullWidth
            margin="normal"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
          {menu.map((menuItem, index) => (
            <Box key={index} mb={3}>
              <Typography variant="h6">메뉴 {index + 1}</Typography>
              <TextField
                label="메뉴 이름"
                variant="outlined"
                fullWidth
                margin="normal"
                value={menuItem.name}
                onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
                required={index === 0}
              />
              <TextField
                label="가격"
                variant="outlined"
                fullWidth
                margin="normal"
                value={menuItem.price}
                onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
                required={index === 0}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>단백질원</InputLabel>
                <Select
                  multiple
                  value={menuItem.proteinTags}
                  onChange={(e) => handleMenuChange(index, 'proteinTags', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {['닭고기', '소고기', '돼지고기', '양고기', '생선', '두부', '달걀'].map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>탄수화물</InputLabel>
                <Select
                  multiple
                  value={menuItem.carbTags}
                  onChange={(e) => handleMenuChange(index, 'carbTags', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {['쌀', '밀', '보리', '옥수수'].map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>맵기</InputLabel>
                <Select
                  value={menuItem.spiceLevel}
                  onChange={(e) => handleMenuChange(index, 'spiceLevel', e.target.value)}
                >
                  {['1', '2', '3'].map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>염도</InputLabel>
                <Select
                  value={menuItem.saltLevel}
                  onChange={(e) => handleMenuChange(index, 'saltLevel', e.target.value)}
                >
                  {['짜다', '안짜다'].map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            식당 추가
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AddRestaurant;
