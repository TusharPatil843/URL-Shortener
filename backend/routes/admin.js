const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

// GET all shortened URLs
router.get('/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Endpoint to check password
router.post("/check-password", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

module.exports = router;
