const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./server/routes/userRoutes');
const diningRoutes = require('./server/routes/diningRoutes');
const reviewRoutes = require('./server/routes/reviewRoutes');
const commentRoutes = require('./server/routes/commentRoutes');
const likeRoutes = require('./server/routes/likeRoutes');
const { notFound, errorHandler } = require('./server/middlewares/errorMiddleware');

// 환경 변수 설정
dotenv.config();

// MongoDB 연결
mongoose.set('strictQuery', false); // strictQuery 설정
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
}).catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(cors());

// 라우트 설정
app.use('/api/users', userRoutes);
app.use('/api/dining', diningRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);

// 에러 핸들링 미들웨어
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
