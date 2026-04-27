import { useState, useEffect } from 'react';
import axios from 'axios';

function LogForm({ onSaved, editingLog, onCancel }) {
    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [mood, setMood] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');

    // get activities for the dropdown
    useEffect(() => {
        axios.get('http://localhost:5000/api/activities')
            .then(res => setActivities(res.data))
            .catch(err => console.log('Could not load activities'));
    }, []);

    // fill form when editing
    useEffect(() => {
        if (editingLog) {
            setActivityId(editingLog.activityId?._id || '');
            setDate(editingLog.date ? editingLog.date.substring(0, 10) : '');
            setDuration(editingLog.duration || '');
            setMood(editingLog.mood || '');
            setNotes(editingLog.notes || '');
        }
    }, [editingLog]);

    const resetForm = () => {
        setActivityId('');
        setDate('');
        setDuration('');
        setMood('');
        setNotes('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!activityId || !date || !duration) {
            setError('Please fill in activity, date and duration');
            return;
        }

        const data = {
            activityId,
            date,
            duration: Number(duration),
            mood: mood ? Number(mood) : undefined,
            notes
        };

        try {
            if (editingLog) {
                await axios.put('http://localhost:5000/api/logs/' + editingLog._id, data);
            } else {
                await axios.post('http://localhost:5000/api/logs', data);
            }
            resetForm();
            onSaved();
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="form-box">
            <h2>{editingLog ? 'Edit Log' : 'Log an Activity'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Activity</label>
                    <select value={activityId} onChange={(e) => setActivityId(e.target.value)}>
                        <option value="">-- Pick an activity --</option>
                        {activities.map(a => (
                            <option key={a._id} value={a._id}>
                                {a.categoryId?.icon} {a.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-row">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="form-row">
                    <label>Duration (hours)</label>
                    <input
                        type="number"
                        step="0.5"
                        min="0.1"
                        max="24"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 1.5"
                    />
                </div>
                <div className="form-row">
                    <label>Mood</label>
                    <select value={mood} onChange={(e) => setMood(e.target.value)}>
                        <option value="">-- How did it feel? --</option>
                        <option value="1">😞 Bad</option>
                        <option value="2">😐 Meh</option>
                        <option value="3">🙂 Ok</option>
                        <option value="4">😊 Good</option>
                        <option value="5">🤩 Great</option>
                    </select>
                </div>
                <div className="form-row">
                    <label>Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any thoughts about this activity?"
                        rows="2"
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit">{editingLog ? 'Update' : 'Add Log'}</button>
                    {editingLog && (
                        <button type="button" onClick={() => { resetForm(); onCancel(); }}>Cancel</button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default LogForm;
