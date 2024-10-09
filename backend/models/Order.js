const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{ type: Object, required: true }],
  totalCost: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'In Progress', 'Out for Delivery', 'Delivered'], default: 'Pending' },
  estimatedDeliveryTime: { type: Date }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
