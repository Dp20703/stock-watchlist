const express = require('express');
const router = express.Router();
const watchlistModel = require('../models/watchlist.model');
const { use } = require('react');

// Add to watchlist => [ /api/watchlist/add ]
router.post('/add', async (req, res) => {
    const { symbol } = req.body;

    if (!symbol || typeof symbol !== 'string' || symbol.trim() === ' ') {
        return res.status(400).json({ error: 'Sybmol is required and cannot be empty.' })
    }
    try {
        const cleanSymbol = symbol.trim().toUpperCase();
        await watchlistModel.updateOne({ symbol: cleanSymbol }, { $setOnInsert: { symbol: cleanSymbol } }, { upsert: true });
        res.send({ success: true, symbol: cleanSymbol });

    } catch (error) {
        res.status(500).json({ error: 'Failed to save symbol', details: error.message })
    }

})

// Get watchlist => [ /api/watchlist/get ]
router.get("/get", async (req, res) => {
    const items = await watchlistModel.find().lean();
    // res.json(items.map(i => i.symbol));
    res.json(items)
})

// Delete sybmol => [ /api/watchlist/delete/:id ]
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await watchlistModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'Symbol not found in watchlist' });
        }

        res.json({ message: 'Symbol deleted', deleted: result });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update symbol => [ /api/watchlist/update/:id ]
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { symbol } = req.body

    if (!symbol) {
        return res.status(400).json({ error: 'Symbol is required' });
    }

    try {
        const result = await watchlistModel.findOneAndUpdate({ _id: id }, { symbol }, { new: true });

        if (!result) {
            return res.status(404).json({ error: 'Symbol not found in watchlist' });
        }

        res.json({ message: 'Symbol updated', updated: result });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;




