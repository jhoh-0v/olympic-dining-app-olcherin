import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Card, CardMedia, CardContent, Grid, Rating } from '@mui/material';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dining');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleCardClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          식당 목록
        </Typography>
        <Grid container spacing={3}>
          {restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
              <Card onClick={() => handleCardClick(restaurant._id)} style={{ cursor: 'pointer' }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {restaurant.name}
                  </Typography>
                  <Rating value={restaurant.rating} precision={0.5} readOnly />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default RestaurantList;
