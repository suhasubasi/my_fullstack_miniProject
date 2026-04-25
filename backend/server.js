const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('DB connection error:', err));

// routes
const logRoutes = require('./routes/logRoutes');
const activityRoutes = require('./routes/activityRoutes');

app.use('/api/logs', logRoutes);
app.use('/api/activities', activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});