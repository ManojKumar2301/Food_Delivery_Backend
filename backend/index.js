const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const { setupWebSocket } = require('./utils/webSocket');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

// Connection to Database
mongoose
  .connect('mongodb://localhost:27017/food')// Replace with your mongodb connection
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));


const server = app.listen(3001, () => {
  console.log('Server running on port 3001');
});
setupWebSocket(server);
