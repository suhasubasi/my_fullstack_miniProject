const Activity = require('../models/Activity');

// get all activities with their category info
const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find().populate('categoryId');
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: 'Could not get activities' });
    }
};

module.exports = { getAllActivities };
