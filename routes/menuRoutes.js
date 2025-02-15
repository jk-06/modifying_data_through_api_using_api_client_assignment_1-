const express = require('express');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !price) return res.status(400).json({ error: 'Name and price required' });

        const newItem = new MenuItem({ name, description, price });
        await newItem.save();
        res.status(201).json({ message: 'Menu item added', newItem });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
