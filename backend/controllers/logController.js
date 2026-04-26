const Log = require('../models/Log');

// get all logs - also supports filtering by activityId
const getAllLogs = async (req, res) => {
    try {
        let filter = {};
        if (req.query.activityId) {
            filter.activityId = req.query.activityId;
        }

        const logs = await Log.find(filter).populate({
            path: 'activityId',
            populate: { path: 'categoryId' }
        });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: 'Could not get logs' });
    }
};

// create a new log
const createLog = async (req, res) => {
    try {
        const { activityId, date, duration, mood, notes } = req.body;

        if (!activityId || !date || !duration) {
            return res.status(400).json({ error: 'activityId, date and duration are required' });
        }

        if (duration < 0.1 || duration > 24) {
            return res.status(400).json({ error: 'duration must be between 0.1 and 24 hours' });
        }

        if (mood && (mood < 1 || mood > 5)) {
            return res.status(400).json({ error: 'mood must be between 1 and 5' });
        }

        const log = new Log({ activityId, date, duration, mood, notes });
        const saved = await log.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: 'Could not create log' });
    }
};

// update a log
const updateLog = async (req, res) => {
    try {
        const updated = await Log.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Log not found' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Could not update log' });
    }
};

// delete a log
const deleteLog = async (req, res) => {
    try {
        const deleted = await Log.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Log not found' });
        }
        res.json({ message: 'Log deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete log' });
    }
};

module.exports = { getAllLogs, createLog, updateLog, deleteLog };
