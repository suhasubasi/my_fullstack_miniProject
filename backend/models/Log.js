const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
    date: { type: Date, required: true },
    duration: { type: Number, required: true, min: 0.1, max: 24 },
    mood: { type: Number, min: 1, max: 5 },
    notes: { type: String, default: '' }
});

module.exports = mongoose.model('Log', logSchema);
