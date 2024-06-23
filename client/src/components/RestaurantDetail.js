import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Tabs, Tab, AppBar, Toolbar, Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Rating } from '@mui/material';
import axios from 'axios';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/dining/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReviewSubmit = async () => {
    if (reviewContent.length > 100) {
      alert("리뷰는 100자 이내로 작성해 주세요.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/dining/${id}/review`, {
        menu: selectedMenu,
        content: reviewContent,
        rating: reviewRating,
      });
      setRestaurant(prevState => ({
        ...prevState,
        reviews: [...prevState.reviews, response.data],
      }));
      setReviewContent('');
      setReviewRating(0);
      setSelectedMenu('');
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  if (!restaurant) {
    return <Typography>식당을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Container>
      <Box mt={5}>
        <Toolbar>
          <Button color="inherit" onClick={() => window.history.back()}>
            뒤로가기
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {restaurant.name}
          </Typography>
        </Toolbar>
        <Box mt={2} textAlign="center">
          <Typography variant="h4">{restaurant.name}</Typography>
          <Typography variant="h6">영업시간: {restaurant.hours}</Typography>
          <Typography variant="h6">
            리뷰 개수: {restaurant.reviews ? restaurant.reviews.length : 0}
          </Typography>
        </Box>
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="메뉴" />
            <Tab label="위치" />
            <Tab label="리뷰" />
          </Tabs>
        </AppBar>
        <Box mt={2}>
          {tabValue === 0 && (
            <Paper>
              {restaurant.menu && restaurant.menu.length > 0 ? (
                restaurant.menu.map((menuItem, index) => (
                  <Box key={index} p={2} borderBottom={1} borderColor="grey.300">
                    <Typography variant="h6">{menuItem.name}</Typography>
                    <Typography>{menuItem.description}</Typography>
                    <Typography>가격: {menuItem.price}</Typography>
                    <Typography>태그: {menuItem.tags.join(', ')}</Typography>
                  </Box>
                ))
              ) : (
                <Typography>메뉴 정보가 없습니다.</Typography>
              )}
            </Paper>
          )}
          {tabValue === 1 && (
            <Paper>
              <Box p={2}>
                <Typography variant="h6">위치 정보</Typography>
                <Typography>{restaurant.location}</Typography>
              </Box>
            </Paper>
          )}
          {tabValue === 2 && (
            <Paper>
              <Box p={2}>
                <Typography variant="h6">리뷰</Typography>
                {restaurant.reviews && restaurant.reviews.length > 0 ? (
                  restaurant.reviews.map((review, index) => (
                    <Box key={index} mb={2} p={2} borderBottom={1} borderColor="grey.300">
                      <Typography>메뉴: {review.menu}</Typography>
                      <Typography>리뷰: {review.content}</Typography>
                      <Rating value={review.rating} readOnly />
                      <Typography variant="caption">작성자: {review.author}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>리뷰가 없습니다.</Typography>
                )}
                <Box mt={2}>
                  <Typography variant="h6">리뷰 작성하기</Typography>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>메뉴 선택</InputLabel>
                    <Select
                      value={selectedMenu}
                      onChange={(e) => setSelectedMenu(e.target.value)}
                    >
                      {restaurant.menu && restaurant.menu.map((menuItem) => (
                        <MenuItem key={menuItem.name} value={menuItem.name}>
                          {menuItem.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="리뷰 내용을 작성하세요 (100자 이내)"
                    inputProps={{ maxLength: 100 }}
                  />
                  <Box mt={2}>
                    <Typography component="legend">별점</Typography>
                    <Rating
                      value={reviewRating}
                      onChange={(e, newValue) => setReviewRating(newValue)}
                    />
                  </Box>
                  <Button variant="contained" color="primary" onClick={handleReviewSubmit} sx={{ mt: 1 }}>
                    제출
                  </Button>
                </Box>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RestaurantDetail;
