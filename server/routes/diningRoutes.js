const express = require('express');
const router = express.Router();
const { addRestaurant,getRestaurants,getRestaurantById } = require('../controllers/diningController'); // diningController.js에서 addRestaurant 가져오기

router.post('/add', addRestaurant); // 식당 추가 라우트

// 식당 목록 가져오기 라우트
router.get('/', getRestaurants);

// 식당 상세 정보 가져오기 라우트
router.get('/:id', getRestaurantById);

module.exports = router;
