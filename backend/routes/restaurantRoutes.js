const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Create Restaurant
router.post('/', async (req, res) => {
    const restaurant = new Restaurant(req.body);
    try {
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update Restaurant
router.put('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add Menu Item
router.post('/:id/menu', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        restaurant.menu.push(req.body);
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update Menu Item
router.put('/:restaurantId/menu/:itemId', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        const item = restaurant.menu.id(req.params.itemId);
        Object.assign(item, req.body);
        await restaurant.save();
        res.json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
