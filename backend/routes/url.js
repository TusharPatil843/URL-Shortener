const express = require('express');
const { nanoid } = require('nanoid');
const validator = require('validator');
const Url = require('../models/Url');

const router = express.Router();

/**
 * @route   POST /api/shorten
 * @desc    Create a short URL
 */
router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // 1. Validate input
    if (!originalUrl || !validator.isURL(originalUrl, { require_protocol: true })) {
      return res.status(400).json({ error: 'Invalid URL. Must include http:// or https://' });
    }

    // 2. Check if already exists in DB
    let existing = await Url.findOne({ originalUrl });
    if (existing) {
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${existing.shortCode}`
      });
    }

    // 3. Generate unique short code
    const shortCode = nanoid(6); // 6 chars

    // 4. Save to DB
    const newUrl = new Url({
      originalUrl,
      shortCode
    });
    await newUrl.save();

    // 5. Respond with full short URL
    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });

  } catch (err) {
    console.error('Error creating short URL:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


/**
 * @route   GET /:shortcode
 * @desc    Redirect to the original URL
 */
router.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;

    // 1. Find the matching shortCode in DB
    const url = await Url.findOne({ shortCode: shortcode });

    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    // 2. Increase click count (optional but nice)
    url.clicks += 1;
    await url.save();

    // 3. Redirect
    return res.redirect(url.originalUrl);

  } catch (err) {
    console.error('Error redirecting:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
