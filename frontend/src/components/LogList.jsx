import { useState, useEffect } from 'react';
import axios from 'axios';
import LogRow from './LogRow';

function LogList({ refreshKey, onEdit }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    const fetchLogs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/logs');
            setLogs(res.data);
            setError(null);
        } catch (err) {
            setError('Failed to load logs');
        } finally {
            setLoading(false);
        }
    };

    // fetch on mount and when refreshKey changes
    useEffect(() => {
        fetchLogs();
    }, [refreshKey]);

    // auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchLogs();
        }, 30000);

        // cleanup - clear interval when component unmounts
        return () => clearInterval(interval);
    }, []);

    // delete a log
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this log?')) return;

        try {
            await axios.delete('http://localhost:5000/api/logs/' + id);
            setLogs(logs.filter(l => l._id !== id));
        } catch (err) {
            alert('Failed to delete log');
        }
    };

    // filter by activity name
    const filtered = logs.filter(l => {
        if (!search) return true;
        const name = l.activityId?.name || '';
        return name.toLowerCase().includes(search.toLowerCase());
    });

    if (loading) return <p>Loading logs...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <div className="list-header">
                <h2>Activity Logs</h2>
                <input
                    type="text"
                    placeholder="Search by activity..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-box"
                />
            </div>

            {filtered.length === 0 ? (
                <p>No logs found.</p>
            ) : (
                <table className="log-table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Mood</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(log => (
                            <LogRow
                                key={log._id}
                                log={log}
                                onDelete={handleDelete}
                                onEdit={onEdit}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default LogList;
