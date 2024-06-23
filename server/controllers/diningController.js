const asyncHandler = require('express-async-handler');
const Dining = require('../models/Dining');

// 식당 추가 컨트롤러
const addRestaurant = asyncHandler(async (req, res) => {
  const { name, image, hours, menu } = req.body;

  if (!name || !hours || !menu || !menu[0].name || !menu[0].price) {
    res.status(400);
    throw new Error('필수 정보를 모두 입력하세요.');
  }

  const restaurant = new Dining({
    name,
    image,
    hours,
    menu,
  });

  const createdRestaurant = await restaurant.save();
  res.status(201).json(createdRestaurant);
});

// 식당 목록 가져오기 컨트롤러
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Dining.find({});
  res.json(restaurants);
});

// 식당 상세 정보 가져오기 컨트롤러
const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Dining.findById(req.params.id);

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404);
    throw new Error('식당을 찾을 수 없습니다.');
  }
});

module.exports = {
  addRestaurant,
  getRestaurants,
  getRestaurantById,
};