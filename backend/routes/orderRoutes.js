const express = require('express');
const {
  createOrder,
  trackOrder,
  getOrderDetails,
  updateOrderStatus,
  getUserOrders
} = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /orders: Place a new order
router.post('/', authMiddleware, createOrder);

// GET /orders/:orderId: Get the details of an order
router.get('/:orderId', authMiddleware, getOrderDetails);

// PUT /orders/:orderId/status: Update the order status
router.put('/:orderId/status', authMiddleware, updateOrderStatus);

// GET /orders: List all orders for the logged in user
router.get('/', authMiddleware, getUserOrders);

// GET /orders/:orderId/track: Track order status
router.get('/:orderId/track', authMiddleware, trackOrder);

module.exports = router;
