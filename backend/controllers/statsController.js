const Log = require('../models/Log');
require('../models/Activity');
require('../models/Category');

const getStats = async (req, res) => {
    try {
        const logs = await Log.find().populate({
            path: 'activityId',
            populate: { path: 'categoryId' }
        });

        const totalLogs = logs.length;
        const totalHours = logs.reduce((sum, l) => sum + l.duration, 0);
        const moodLogs = logs.filter(l => l.mood);
        const averageMood = moodLogs.length
            ? (moodLogs.reduce((sum, l) => sum + l.mood, 0) / moodLogs.length).toFixed(1)
            : null;

        const byCategory = {};
        logs.forEach(l => {
            const cat = l.activityId?.categoryId?.name || 'Unknown';
            byCategory[cat] = (byCategory[cat] || 0) + l.duration;
        });

        res.json({ totalLogs, totalHours, averageMood, byCategory });
    } catch (err) {
        res.status(500).json({ error: 'Could not get stats' });
    }
};

module.exports = { getStats };