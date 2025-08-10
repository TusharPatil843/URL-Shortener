// Load environment variables first
require('dotenv').config();

// Core imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const adminRoutes = require('./routes/admin');


// Create express app
const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ===== DATABASE CONNECTION =====
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
});




// Routes
app.use('/api', require('./routes/url'));

app.use('/', require('./routes/url'));

app.use('/api/admin', adminRoutes);


//  TEST 
app.get('/', (req, res) => {
  res.json({ message: 'URL Shortener API running' });
});

// ===== SERVER LISTEN =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
