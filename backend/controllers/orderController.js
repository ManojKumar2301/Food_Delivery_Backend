const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

// Place a new order
exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

  
    let totalCost = 0;
    items.forEach((item) => {
      if (!item.available) return  'Item unavailable' ;
      totalCost=totalCost+item.quantity*item.price
    });

    const order = new Order({
      user: req.user.id,
      restaurant: restaurantId,
      items,
      totalCost,
      deliveryAddress,
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60000) // 45 minutes delivery time
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Track order status
exports.trackOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ status: order.status });
};

// Get the details of an order including its status and items
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('restaurant').populate('user');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({
      orderId: order._id,
      status: order.status,
      items: order.items,
      totalCost: order.totalCost,
      deliveryAddress: order.deliveryAddress,
      estimatedDeliveryTime: order.estimatedDeliveryTime,
      restaurant: order.restaurant.name,
      user: order.user.name
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Pending', 'Confirmed', 'In Progress', 'Out for Delivery', 'Delivered'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', status: order.status });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders of the user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('restaurant');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
