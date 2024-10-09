const Restaurant = require('../models/Restaurant');

// Create a restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, location } = req.body;
    const restaurant = new Restaurant({ name, location });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add menu items
exports.addMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    const { name, description, price, availability } = req.body;
    restaurant.menu.push({ name, description, price, availability });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
