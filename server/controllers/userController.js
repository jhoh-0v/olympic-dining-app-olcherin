const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name, nickname, age, country, sport, bio } = req.body;

    console.log('Received user data:', req.body); // 요청 데이터 로그 출력

    try {
        // 사용자 이미 존재하는지 확인
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = new User({
            email,
            password,
            name,
            nickname,
            age,
            country,
            sport,
            bio,
            username: email.split('@')[0] // username 필드를 email의 앞부분으로 설정
        });

        await user.save(); // 유저 저장

        res.status(201).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            nickname: user.nickname,
            age: user.age,
            country: user.country,
            sport: user.sport,
            bio: user.bio,
        });

    } catch (error) {
        console.error('Error during user registration:', error); // 에러 로그 출력
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            nickname: user.nickname,
            age: user.age,
            country: user.country,
            sport: user.sport,
            bio: user.bio,
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports = { registerUser, loginUser };
