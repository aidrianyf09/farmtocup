require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/farms', require('./routes/farms'));
app.use('/api/team', require('./routes/team'));
app.use('/api/cms', require('./routes/cms'));
app.use('/api/contact', require('./routes/contact'));

app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Farm to Cup API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
